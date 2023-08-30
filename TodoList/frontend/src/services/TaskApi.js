import axios from "axios";

const CATEGORY_URL = "/category/api/v1";

class CategoryApi {
    // CREATE
    categoryApiCreate(categoryDto) {
        return axios.post(`${CATEGORY_URL}/create`, categoryDto);
    }

    // LIST
    categoryApiList() {
        return axios.get(`${CATEGORY_URL}/list`);
    }

    // FIND
    categoryApiFindById(id) {
        return axios.get(`${CATEGORY_URL}/find/${id}`);
    }

    // UPDATE
    categoryApiUpdate(id, categoryDto) {
        return axios.put(`${CATEGORY_URL}/update/${id}`, categoryDto);
    }

    // DELETE BY ID
    categoryApiDeleteById(id) {
        return axios.delete(`${CATEGORY_URL}/delete/${id}`);
    }
}

export default new CategoryApi();