function List({ title, description, children }) {
  return (
    <div className="mb-20">
      <div className="flex flex-col space-y-3 mb-10">
        <h1 className="text-4xl text-gray-100 font-bold">{title}</h1>

        {description && (
          <h2 className="text-md text-gray-300">{description}</h2>
        )}
      </div>
      <div className="relative">
        <div className="flex scrollbar-hide overflow-x-auto space-x-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default List;
