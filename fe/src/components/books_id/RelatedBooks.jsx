const RelatedBooks = ({ books }) => (
  <section className="mt-20 mb-12">
    <h3 className="text-2xl font-bold text-slate-900 mb-6">You may also like</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {books.map((b) => (
        <div key={b.title}
          className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:shadow-blue-100 border border-slate-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-100 mb-3">
            <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <h5 className="font-bold text-slate-900 text-sm line-clamp-1">{b.title}</h5>
          <p className="text-xs text-slate-500 mb-2">{b.author}</p>
          <p className="text-sm font-bold text-blue-600">₹{b.price}</p>
        </div>
      ))}
    </div>
  </section>
);

export default RelatedBooks;