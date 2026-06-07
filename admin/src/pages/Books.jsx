import React, { useState, useEffect } from 'react';
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
  fetchCategories,
  fetchAuthors,
} from '../lib/api';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
  CheckCircle,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Categories & Authors lists for dropdowns
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    shortDescription: '',
    isbn: '',
    publisher: '',
    publicationDate: '',
    language: 'English',
    category: '',
    tags: '',
    price: '',
    discountPrice: '',
    currency: 'INR',
    stock: '',
    coverImages: '',
    pdfUrl: '',
    status: 'published',
    isFeatured: false,
    searchKeywords: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const res = await fetchBooks({ page, limit, search });
      setBooks(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotal(res.pagination?.total || 0);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const loadDropdowns = async () => {
    try {
      const [cats, auths] = await Promise.all([fetchCategories(), fetchAuthors()]);
      setCategories(cats);
      setAuthors(auths);
    } catch (err) {
      console.error('Error loading dropdown lists:', err);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [page, search]);

  useEffect(() => {
    loadDropdowns();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      author: authors[0]?._id || '',
      description: '',
      shortDescription: '',
      isbn: '',
      publisher: '',
      publicationDate: '',
      language: 'English',
      category: categories[0]?._id || '',
      tags: '',
      price: '',
      discountPrice: '0',
      currency: 'INR',
      stock: '10',
      coverImages: '',
      pdfUrl: '',
      status: 'published',
      isFeatured: false,
      searchKeywords: '',
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleOpenEdit = (book) => {
    setEditingId(book._id);

    // Format date to YYYY-MM-DD for input field
    let pubDate = '';
    if (book.publicationDate) {
      pubDate = new Date(book.publicationDate).toISOString().split('T')[0];
    }

    setFormData({
      title: book.title || '',
      author: typeof book.author === 'object' ? book.author?._id : book.author || '',
      description: book.description || '',
      shortDescription: book.shortDescription || '',
      isbn: book.isbn || '',
      publisher: book.publisher || '',
      publicationDate: pubDate,
      language: book.language || 'English',
      category: typeof book.category === 'object' ? book.category?._id : book.category || '',
      tags: book.tags ? book.tags.join(', ') : '',
      price: book.price || '',
      discountPrice: book.discountPrice !== undefined ? book.discountPrice : '0',
      currency: book.currency || 'INR',
      stock: book.stock !== undefined ? book.stock : '10',
      coverImages: book.coverImages ? book.coverImages.join(', ') : '',
      pdfUrl: book.pdfUrl || '',
      status: book.status || 'published',
      isFeatured: !!book.isFeatured,
      searchKeywords: book.searchKeywords ? book.searchKeywords.join(', ') : '',
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.author) errors.author = 'Author selection is required';
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters long';
    }
    if (!formData.isbn.trim() || formData.isbn.trim().length < 10) {
      errors.isbn = 'ISBN must be at least 10 characters long';
    }
    if (!formData.language.trim()) errors.language = 'Language is required';
    if (!formData.category) errors.category = 'Category selection is required';

    if (formData.price === '' || isNaN(formData.price) || Number(formData.price) <= 0) {
      errors.price = 'Price must be a positive number';
    }

    if (
      formData.discountPrice === '' ||
      isNaN(formData.discountPrice) ||
      Number(formData.discountPrice) < 0
    ) {
      errors.discountPrice = 'Discount price must be a non-negative number';
    } else if (Number(formData.discountPrice) > Number(formData.price)) {
      errors.discountPrice = 'Discount price must be less than or equal to original price';
    }

    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) {
      errors.stock = 'Stock must be a non-negative number';
    }

    if (!formData.coverImages.trim()) {
      errors.coverImages = 'At least one cover image URL is required';
    } else {
      const urls = formData.coverImages.split(',').map((url) => url.trim());
      const invalidUrls = urls.filter((url) => {
        try {
          new URL(url);
          return false;
        } catch (_) {
          return true;
        }
      });
      if (invalidUrls.length > 0) {
        errors.coverImages = 'All cover image URLs must be valid URL formats';
      }
    }

    if (!formData.pdfUrl.trim()) {
      errors.pdfUrl = 'PDF URL is required';
    } else {
      try {
        new URL(formData.pdfUrl.trim());
      } catch (_) {
        errors.pdfUrl = 'PDF URL must be a valid URL';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    // Parse arrays and types according to Zod payload schema requirements
    const parsedData = {
      title: formData.title.trim(),
      author: formData.author,
      description: formData.description.trim(),
      shortDescription: formData.shortDescription.trim() || undefined,
      isbn: formData.isbn.trim(),
      publisher: formData.publisher.trim() || undefined,
      publicationDate: formData.publicationDate
        ? new Date(formData.publicationDate).toISOString()
        : undefined,
      language: formData.language.trim(),
      category: formData.category,
      tags: formData.tags
        ? formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      price: Number(formData.price),
      discountPrice: Number(formData.discountPrice),
      currency: formData.currency,
      stock: Number(formData.stock),
      coverImages: formData.coverImages
        .split(',')
        .map((url) => url.trim())
        .filter(Boolean),
      pdfUrl: formData.pdfUrl.trim(),
      status: formData.status,
      isFeatured: formData.isFeatured,
      searchKeywords: formData.searchKeywords
        ? formData.searchKeywords
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean)
        : [],
    };

    try {
      if (editingId) {
        await updateBook(editingId, parsedData);
      } else {
        await createBook(parsedData);
      }
      setModalOpen(false);
      loadBooks();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Action failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await deleteBook(id);
      loadBooks();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to delete book');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={24} />
            Books Catalog
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your store book collection, adjust stock, and edit pricing tags.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 text-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          Add New Book
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 text-sm text-slate-700 transition-colors placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="text-xs text-slate-400 whitespace-nowrap">
          Total: <span className="font-semibold text-slate-700">{total}</span> books
        </div>
      </div>

      {/* Grid or Table list */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="text-indigo-600 animate-spin" size={36} />
          <span className="text-slate-400 text-sm font-medium">Loading books catalog...</span>
        </div>
      ) : books.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm">
          <BookOpen className="mx-auto text-slate-300 mb-4 opacity-40" size={48} />
          <h3 className="font-bold text-slate-800 text-lg">No Books Found</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
            {search
              ? 'No matches found. Try entering a different book name, author, or ISBN code.'
              : 'Add your first book to display it on the store catalog.'}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3.5 py-2 border border-indigo-100 hover:border-indigo-200 rounded-xl bg-indigo-50/50 cursor-pointer"
            >
              Clear Search Query
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => {
            const formattedPrice = book.price?.toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            });
            const hasDiscount = book.discountPrice > 0;
            const finalPrice = hasDiscount ? book.discountPrice : book.price;

            return (
              <div
                key={book._id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative"
              >
                {/* Book Image */}
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {book.coverImages?.[0] ? (
                    <img
                      src={book.coverImages[0]}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300';
                      }}
                    />
                  ) : (
                    <ImageIcon size={36} className="text-slate-300" />
                  )}

                  {/* Status Overlay */}
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {book.status === 'draft' && (
                      <span className="bg-slate-850/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm uppercase">
                        Draft
                      </span>
                    )}
                    {book.status === 'out_of_stock' && (
                      <span className="bg-red-500/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm uppercase">
                        Out of Stock
                      </span>
                    )}
                    {book.isFeatured && (
                      <span className="bg-amber-500/95 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm uppercase flex items-center gap-0.5">
                        <Star size={8} fill="#fff" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <span className="bg-indigo-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm uppercase font-mono">
                      {book.isbn?.slice(-4)}
                    </span>
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-3.5">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      {typeof book.category === 'object' ? book.category?.name : 'Book'}
                    </div>
                    <h3
                      className="font-bold text-slate-800 text-sm leading-snug line-clamp-2"
                      title={book.title}
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      by{' '}
                      <span className="font-medium text-slate-600">
                        {typeof book.author === 'object' ? book.author?.name : book.author}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-extrabold text-slate-800">
                        {finalPrice?.toLocaleString('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      {hasDiscount && (
                        <span className="text-[10px] text-slate-300 line-through">
                          {formattedPrice}
                        </span>
                      )}
                    </div>

                    <div className="text-right flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-500">
                        Stock:{' '}
                        <span
                          className={book.stock <= 5 ? 'text-red-500 font-bold' : 'text-slate-700'}
                        >
                          {book.stock}
                        </span>
                      </span>
                      <span className="text-[9px] text-slate-400">{book.viewCount || 0} views</span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                    <button
                      onClick={() => handleOpenEdit(book)}
                      className="flex-1 py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 rounded-lg text-slate-600 hover:text-indigo-600 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <Edit2 size={11} />
                      Edit Details
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="p-1.5 border border-slate-100 hover:border-red-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"
                      title="Delete Book"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Footer */}
      {!loading && totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
          <span className="text-xs text-slate-500">
            Page <span className="font-semibold text-slate-700">{page}</span> of{' '}
            <span className="font-semibold text-slate-700">{totalPages}</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Create / Edit Book Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 overflow-y-auto py-10">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-[fadeSlide_0.2s_ease] my-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <BookOpen className="text-indigo-600" size={18} />
                {editingId ? 'Edit Book Specifications' : 'Add New Book to Store'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Book Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Clean Code"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${formErrors.title ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.title && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.title}
                    </p>
                  )}
                </div>

                {/* Author Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Author Selection
                  </label>
                  <select
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all bg-white
                      ${formErrors.author ? 'border-red-400' : 'border-slate-200'}`}
                  >
                    <option value="">-- Choose Author --</option>
                    {authors.map((auth) => (
                      <option key={auth._id} value={auth._id}>
                        {auth.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.author && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.author}
                    </p>
                  )}
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Category Classification
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all bg-white
                      ${formErrors.category ? 'border-red-400' : 'border-slate-200'}`}
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.category}
                    </p>
                  )}
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Original Price (INR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 599"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${formErrors.price ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.price && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.price}
                    </p>
                  )}
                </div>

                {/* Discount Price */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Discounted Price (INR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 499 (0 if none)"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${formErrors.discountPrice ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.discountPrice && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.discountPrice}
                    </p>
                  )}
                </div>

                {/* Stock Inventory */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Initial Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 25"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${formErrors.stock ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.stock && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.stock}
                    </p>
                  )}
                </div>

                {/* ISBN Code */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    ISBN Barcode Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9780132350884"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${formErrors.isbn ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.isbn && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.isbn}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Long Description (min 10 chars)
                  </label>
                  <textarea
                    placeholder="Provide a detailed overview of the book's contents, target audience, and key lessons..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all resize-none
                      ${formErrors.description ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.description && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.description}
                    </p>
                  )}
                </div>

                {/* Short Description */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Short Summary Description (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. A handbook of agile software craftsmanship."
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all"
                  />
                </div>

                {/* Cover Image URLs */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Cover Image URL(s) (comma-separated list)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://example.com/cover1.jpg, https://example.com/cover2.jpg"
                    value={formData.coverImages}
                    onChange={(e) => setFormData({ ...formData, coverImages: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${formErrors.coverImages ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.coverImages && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.coverImages}
                    </p>
                  )}
                </div>

                {/* PDF Url */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    PDF E-Book Download URL
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://example.com/ebook.pdf"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${formErrors.pdfUrl ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.pdfUrl && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.pdfUrl}
                    </p>
                  )}
                </div>

                {/* Publisher */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Publisher Agency (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Prentice Hall"
                    value={formData.publisher}
                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all"
                  />
                </div>

                {/* Publication Date */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Publication Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.publicationDate}
                    onChange={(e) => setFormData({ ...formData, publicationDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Book Language
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. English"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all
                      ${formErrors.language ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {formErrors.language && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {formErrors.language}
                    </p>
                  )}
                </div>

                {/* Status selector */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Catalog Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all bg-white"
                  >
                    <option value="published">Published (Active)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Category Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. programming, software, agile"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all"
                  />
                </div>

                {/* Search Keywords */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    SEO Search Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. coder, clean, martin"
                    value={formData.searchKeywords}
                    onChange={(e) => setFormData({ ...formData, searchKeywords: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all"
                  />
                </div>

                {/* Featured checkbox */}
                <div className="col-span-2 flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <label
                    htmlFor="isFeatured"
                    className="text-sm font-semibold text-slate-700 cursor-pointer"
                  >
                    Promote this book in Featured section of store
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl active:scale-95 shadow-md shadow-indigo-600/15 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  {editingId ? 'Save Book Changes' : 'Create Book Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
