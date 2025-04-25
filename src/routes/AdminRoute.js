import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../admin/container/Category/Category';
import SubCategory from '../admin/container/SubCategory/SubCategory';
import Layout from '../admin/component/Layout/Layout';
import Counter from '../admin/container/Counter/Counter';

function AdminRoute(props) {
    return (
        <Layout>
            <Routes>
                <Route path='/category' element={<Category />} />
                <Route path='/subcategory' element={<SubCategory />} />
                <Route path='/counter' element={<Counter />} />
            </Routes>
        </Layout>
    );
}

export default AdminRoute;