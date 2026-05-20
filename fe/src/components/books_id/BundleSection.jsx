const BundleSection = ({ bundle = false }) => (
  <section className="mt-20">
    <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Bought Together</h3>
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
        <div className="flex items-center gap-4 flex-wrap justify-center font-bold">
          {/* {bundle.books.map((b, i) => (
            <span key={b.title} className="flex items-center gap-4">
              <div className="w-24 h-32 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
              </div>
              {i < bundle.books.length - 1 && <Icon name="add" className="text-slate-400 text-[24px]" />}
            </span>
          ))} */}
          This functionality coming soon
        </div>
        {/* <div className="flex-1 space-y-3 text-center md:text-left">
          <p className="text-xl font-bold text-slate-900">Bundle Price: ₹{bundle.totalPrice.toLocaleString()}</p>
          <p className="text-sm font-semibold text-green-600">You save ₹{bundle.savings} on this bundle</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">
            Add 3 Items to Cart
          </button>
        </div> */}
      </div>
    </div>
  </section>
);

export default BundleSection;