import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

interface Tool {
  website名称: string;
  网址: string;
  描述: string;
}

interface Category {
  [key: string]: Tool[];
}

interface SubCategory {
  [key: string]: Category;
}

interface MainCategory {
  [key: string]: SubCategory;
}

function App() {
  const [categories, setCategories] = useState<MainCategory>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">工具导航</h1>
        
        {Object.entries(categories).map(([mainCategory, subCategories]) => (
          <div key={mainCategory} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{mainCategory}</h2>
            
            {Object.entries(subCategories).map(([subCategory, categories]) => (
              <div key={subCategory} className="mb-6">
                <h3 className="text-xl font-medium text-gray-700 mb-3">{subCategory}</h3>
                
                {Object.entries(categories).map(([category, tools]) => (
                  <Disclosure key={category} className="mb-4">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>{category}</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tools.map((tool, index) => (
                              <a
                                key={index}
                                href={tool.网址}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                              >
                                <h4 className="text-lg font-medium text-gray-900 mb-2">{tool.website名称}</h4>
                                <p className="text-gray-600">{tool.描述}</p>
                              </a>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
