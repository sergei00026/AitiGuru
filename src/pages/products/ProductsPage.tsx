import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {productsApi} from '@/entities/product/api/productsApi';
import type {Product} from '@/entities/product/model/types';
import {useAuthStore} from '@/entities/user/model/store';
import {ProgressBar} from '@/shared/ui/ProgressBar/ProgressBar';
import {Button} from '@/shared/ui/Button/Button';
import {Input} from '@/shared/ui/Input/Input';
import {AddProductForm} from '@/features/product/addProduct/ui/AddProductForm';
import {Toast} from '@/shared/ui/Toast/Toast';
import {Pagination} from '@/shared/ui/Pagination/Pagination';
import {useDebounce} from '@/shared/hooks/useDebounce';
import {StockIndicator} from '@/shared/ui/StockIndicator/StockIndicator';
import {getStockLevel} from '@/entities/product/lib/getStockLevel';
import {formatPrice, formatRating} from '@/entities/product/lib/formatters';
import {CartWidget} from '@/widgets/CartWidget/CartWidget';
import {AddToCartButton} from '@/features/cart/addToCart/ui/AddToCartButton';
import styles from './ProductsPage.module.scss';
import type {AddProductFormValues} from '@/features/product/lib/validation';
import GlobeSimple from '@/assets/GlobeSimple.svg?react';
import EnvelopeSimple from '@/assets/EnvelopeSimple.svg?react';
import Settings from '@/assets/Settings.svg?react';
import Refresh from '@/assets/Refresh.svg?react';
import Filter from '@/assets/Filter.svg?react';
import PlusCircle from '@/assets/PlusCircle.svg?react';
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";

const PRODUCTS_PER_PAGE = 10;

type SortKey = keyof Product;
type SortDirection = 'ascending' | 'descending';

const ProductsPage: React.FC = () => {
  const {logout} = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const fetchProducts = useCallback(async (page: number, query: string) => {
    setLoading(true);
    setError(null);
    const skip = (page - 1) * PRODUCTS_PER_PAGE;
    try {
      const response = query
        ? await productsApi.searchProducts(query, PRODUCTS_PER_PAGE, skip)
        : await productsApi.getProducts(PRODUCTS_PER_PAGE, skip);
      setProducts(response.products);
      setTotalProducts(response.total);
    } catch (err) {
      setError('Не удалось загрузить товары.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const pageToFetch = debouncedSearchQuery ? 1 : currentPage;
    if (debouncedSearchQuery && currentPage !== 1) {
      setCurrentPage(1);
    }
    fetchProducts(pageToFetch, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, fetchProducts]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (typeof a[sortKey] === 'string' && typeof b[sortKey] === 'string') {
        return sortDirection === 'ascending'
          ? a[sortKey].localeCompare(b[sortKey])
          : b[sortKey].localeCompare(a[sortKey]);
      }
      if (a[sortKey] < b[sortKey]) {
        return sortDirection === 'ascending' ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortDirection === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [products, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortKey(key);
      setSortDirection('ascending');
    }
  };

  const handleAddProduct = (data: AddProductFormValues) => {
    const newProduct: Product = {
      id: Date.now(),
      title: data.title,
      price: data.price,
      brand: data.vendor,
      category: 'Custom',
      description: '',
      discountPercentage: 0,
      images: [],
      rating: 0,
      stock: 0,
      thumbnail: '',
      sku: '',
    };
    setProducts((prev) => [newProduct, ...prev]);
    setTotalProducts((prev) => prev + 1);
    setToastMessage(`Товар "${data.title}" успешно добавлен!`);
  };

  const renderSortArrow = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === 'ascending' ? ' ▲' : ' ▼';
  };

  return (
    <>
      {loading && <ProgressBar/>}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)}/>}
      {isAddModalOpen && (
        <AddProductForm
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddProduct}
        />
      )}

      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Товары</h1>
          <Input
            id="search-products"
            label=""
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Поиск по названию..."
          />
          <div className={styles.actions}>
            <GlobeSimple className={styles.icon}/>
            <CartWidget/>
            <EnvelopeSimple className={styles.icon}/>
            <Settings className={styles.icon}/>

            <Button onClick={logout} style={{width: 'auto'}}>
              Выйти
            </Button>
          </div>
        </header>
        <div className={styles.title}>
          <h2>Все позиции</h2>
          <div className={styles.titleActions}>
            <Refresh className={styles.titleIcon}/>
            <Filter className={styles.titleIcon}/>

            <Button onClick={() => setIsAddModalOpen(true)} style={{width: 'auto'}}>
              <PlusCircle className={styles.titleIcon}/>
              Добавить товар
            </Button>
          </div>
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <table className={styles.table}>
          <thead>
          <tr>
            <th><Checkbox id='list-checkbox'/></th>
            <th>Наименование</th>
            <th className={styles.sortableHeader} onClick={() => handleSort('title')}>
              Название{renderSortArrow('title')}
            </th>
            <th className={styles.sortableHeader} onClick={() => handleSort('brand')}>
              Вендор{renderSortArrow('brand')}
            </th>
            <th>Артикул</th>
            <th className={styles.sortableHeader} onClick={() => handleSort('rating')}>
              Оценка{renderSortArrow('rating')}
            </th>
            <th className={styles.sortableHeader} onClick={() => handleSort('price')}>
              Цена, ₽{renderSortArrow('price')}
            </th>

            <th className={styles.sortableHeader} onClick={() => handleSort('stock')}>
              Количество{renderSortArrow('stock')}
            </th>

            <th></th>
          </tr>
          </thead>
          <tbody>{
            sortedProducts.map((product: Product) => (
              <tr key={product.id}>
                <td><Checkbox id={`checkbox-${product.id}`}/></td>
                <td>
                  <div className={styles.product}>
                    <img src={product.thumbnail} alt={product.title} className={styles.thumbnail}/>
                    <div className={styles.productBox}>
                    <p>{product.description}</p>
                    <p>{product.category}</p>
                    </div>
                  </div>
                </td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.sku}</td>
                <td className={product.rating < 3 ? styles.lowRating : ''}>
                  {formatRating(product.rating)}
                </td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  <StockIndicator level={getStockLevel(product.stock)}/>
                </td>

                <td>
                  <AddToCartButton product={product}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalProducts}
          itemsPerPage={PRODUCTS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ProductsPage;
