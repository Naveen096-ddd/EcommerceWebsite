import React from "react";
import { categoriesData } from "../../../assets/Assets";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 w-full overflow-hidden">
      <h3 className="text-3xl font-bold mb-4 text-gray-800 text-center">
        {category.image && (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        {category.name}
      </h3>
      {category.subcategories && (
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll space-x-6 whitespace-nowrap">
            {category.subcategories.map((sub, idx) =>
              typeof sub === "string" ? (
                <div key={idx} className="inline-block bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-lg text-center cursor-pointer w-48 flex-shrink-0">
                  {sub}
                </div>
              ) : (
                <div key={idx} className="inline-block bg-green-50 hover:bg-green-100 px-6 py-3 rounded-lg w-56 flex-shrink-0">
                  {sub.image && (
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                    />
                  )}
                  <p className="font-semibold text-gray-800 mb-2 text-center flex justify-center">{sub.name}</p>
                  <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                    {sub.subcategories.map((nested, id) => (
                      <div
                        key={id}
                        className="bg-white px-3 py-1 rounded-lg text-sm flex-shrink-0"
                      >
                        {nested}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
            {category.subcategories.map((sub, idx) =>
              typeof sub === "string" ? (
                <div
                  key={"dup-" + idx}
                  className="inline-block bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-lg text-center cursor-pointer w-48 flex-shrink-0"
                >
                  {sub}
                  
                </div>
              ) : (
                <div
                  key={"dup-" + idx}
                  className="inline-block bg-green-50 hover:bg-green-100 px-6 py-3 rounded-lg w-56 flex-shrink-0"
                >
                  {sub.image && (
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                    />
                  )}
                  <p className="font-semibold text-gray-800 mb-2 justify-center flex text-center">{sub.name}</p>
                  {/* {console.log(sub.name)} */}
                  <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                    {sub.subcategories.map((nested, id) => (
                      <div
                        key={id}
                        className="bg-white px-3 py-1 rounded-lg text-sm flex-shrink-0"
                      >
                        {nested}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Categories = () => {
  return (
    <>
    <Header/>
    <div className="p-6 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-black">
        Furniture Categories
      </h1>

      <div className="flex flex-col space-y-6">
        {categoriesData.map((category, idx) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Categories;
