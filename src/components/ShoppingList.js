import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCat, setNewItemCat] = useState("Produce");
  //const [newItems, setNewItems] = useState([]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleSearchChange(event) {
    setSearchText(event.target.value)
  }
  function handleNewItemName(event) {
    setNewItemName(event.target.value)
    //console.log(event.target.value)
  }
  function handleNewItemCat(event) { 
    setNewItemCat(event.target.value)
    //console.log(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault()
    const newItem = {
      id: uuid(),
      name: newItemName,
      category: newItemCat
    }
    setItems(() => [...items, newItem])
  }

  const filteredItemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const searchedFilteredItemsToDisplay = filteredItemsToDisplay.filter((item) => {
    if (searchText === "") return true;

    return item.name.toLowerCase().includes(searchText.toLowerCase());
  })

  return (
    <div className="ShoppingList">
      <ItemForm onNameChange={handleNewItemName} onCatChange={handleNewItemCat} onItemFormSubmit={handleSubmit} search={searchText}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange}/>
      <ul className="Items">
        {searchedFilteredItemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
