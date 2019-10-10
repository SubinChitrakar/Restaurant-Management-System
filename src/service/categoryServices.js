import * as categoryFunctionalities from "../models/category.js";

export function addCategory(newCategory) {
    return categoryFunctionalities.addCategory(newCategory);
}

export function listCategories() {
    return categoryFunctionalities.listCategory();
}

export function readAllCategory(currentPage) {
    if(currentPage){
        return categoryFunctionalities.readAllCategory(currentPage);
    }
    return categoryFunctionalities.listCategory();

}

export function searchByID(categoryID) {
    return categoryFunctionalities.searchByID(categoryID);
}

export function searchByName(category) {
    return categoryFunctionalities.searchByName(category);
}

export function updateCategory(updatedCategory) {
    return categoryFunctionalities.updateCategory(updatedCategory);
}

export function deleteCategory(categoryID) {
    return categoryFunctionalities.deleteCategory(categoryID);
}

