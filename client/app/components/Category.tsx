import React from "react";

type Props = {};

const Category = ({ cat }: any) => {
  return (
    <div className="pl-8">
      <div     >
        <p>
          <img src={cat?.icon?.url} alt="" />
        </p>
        <p className="font-bold">{cat.name}</p>
        <p>{cat.description}</p>
      </div>
      {cat?.subcategories?.length && (
        <div>
          {cat.subcategories.map((child: any) => (
            <Category key={child._id} cat={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
