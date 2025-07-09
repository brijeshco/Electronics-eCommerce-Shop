'use client';
import { DashboardSidebar } from '@/components';
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from '@/utils/categoryFormating';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    title: string;
    price: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
  }>({
    title: '',
    price: 0,
    manufacturer: '',
    inStock: 1,
    mainImage: '',
    description: '',
    slug: '',
    categoryId: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const addProduct = async () => {
    if (
      product.title === '' ||
      product.manufacturer === '' ||
      product.description === '' ||
      product.slug === ''
    ) {
      toast.error('Please enter values in input fields');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    };

    try {
      const response = await fetch(
        `http://localhost:3001/api/products`,
        requestOptions
      );
      if (response.status === 201) {
        await response.json();
        toast.success('Product added successfully');
        setProduct({
          title: '',
          price: 0,
          manufacturer: '',
          inStock: 1,
          mainImage: '',
          description: '',
          slug: '',
          categoryId: categories[0]?.id || '',
        });
        setPreviewImage(null);
      } else {
        throw new Error('There was an error while creating product');
      }
    } catch (error) {
      toast.error('There was an error while creating product');
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('uploadedFile', file);

    try {
      const response = await fetch('http://localhost:3001/api/main-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('File upload unsuccessful');
      }
    } catch (error) {
      console.error('Error happened while sending request:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/categories`);
      const data = await res.json();
      setCategories(data);
      setProduct((prev) => ({
        ...prev,
        categoryId: data[0]?.id || '',
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5'>
      <DashboardSidebar />
      <div className='flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full'>
        <h1 className='text-3xl font-semibold'>Add new product</h1>

        {/* Product Name */}
        <div>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Product name:</span>
            </div>
            <input
              type='text'
              className='input input-bordered w-full max-w-xs'
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </label>
        </div>

        {/* Slug */}
        <div>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Product slug:</span>
            </div>
            <input
              type='text'
              className='input input-bordered w-full max-w-xs'
              value={product.slug}
              onChange={(e) =>
                setProduct({
                  ...product,
                  slug: convertSlugToURLFriendly(e.target.value),
                })
              }
            />
          </label>
        </div>

        {/* Category */}
        <div>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Category:</span>
            </div>
            <select
              className='select select-bordered'
              value={product.categoryId}
              onChange={(e) =>
                setProduct({ ...product, categoryId: e.target.value })
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Price */}
        <div>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Product price:</span>
            </div>
            <input
              type='number'
              className='input input-bordered w-full max-w-xs'
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
          </label>
        </div>

        {/* Manufacturer */}
        <div>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Manufacturer:</span>
            </div>
            <input
              type='text'
              className='input input-bordered w-full max-w-xs'
              value={product.manufacturer}
              onChange={(e) =>
                setProduct({ ...product, manufacturer: e.target.value })
              }
            />
          </label>
        </div>

        {/* In Stock */}
        <div>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Is product in stock?</span>
            </div>
            <select
              className='select select-bordered'
              value={product.inStock}
              onChange={(e) =>
                setProduct({ ...product, inStock: Number(e.target.value) })
              }
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>
        </div>

        {/* Main Image */}
        <div>
          <input
            type='file'
            className='file-input file-input-bordered file-input-lg w-full max-w-sm'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
                uploadFile(file);
                setProduct({ ...product, mainImage: file.name });
              }
            }}
          />
          {previewImage && (
            <Image
              src={previewImage}
              alt={product.title}
              width={100}
              height={100}
              className='mt-4'
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text'>Product description:</span>
            </div>
            <textarea
              className='textarea textarea-bordered h-24'
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            ></textarea>
          </label>
        </div>

        {/* Submit Button */}
        <div className='flex gap-x-2'>
          <button
            onClick={addProduct}
            type='button'
            className='uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2'
          >
            Add product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
