import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

interface FilterProps {
  filterProducts: (
    filterTitle: string,
    filterCategory: string,
    filterPriceMin: number | null,
    filterPriceMax: number | null
  ) => void;
  categories: string[];
}

const Filter: React.FC<FilterProps> = ({ filterProducts, categories }) => {
  const navigate = useNavigate();
  const [filterTitle, setFilterTitle] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterPriceMin, setFilterPriceMin] = useState<number | null>(null);
  const [filterPriceMax, setFilterPriceMax] = useState<number | null>(null);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterProducts(filterTitle, filterCategory, filterPriceMin, filterPriceMax);

    const query = new URLSearchParams();

    if (filterTitle) {
      query.append('title', filterTitle);
    }

    if (filterCategory) {
      query.append('category', filterCategory);
    }

    if (filterPriceMin !== null) {
      query.append('priceMin', filterPriceMin.toString());
    }

    if (filterPriceMax !== null) {
      query.append('priceMax', filterPriceMax.toString());
    }

    navigate(`/products?${query.toString()}`);
  };

  const handleClearFilter = () => {
    setFilterTitle('');
    setFilterCategory('');
    setFilterPriceMin(null);
    setFilterPriceMax(null);
    filterProducts('', '', null, null); // Llamada a filterProducts con valores vacíos o nulos para mostrar todos los productos
  };

  return (
    <div>
      <h3>Filtrar productos</h3>

      <Form onSubmit={handleFilterSubmit}>
        <Form.Group controlId="formFilterTitle">
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Buscar por título"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formFilterCategory">
          <Form.Label>Categoría:</Form.Label>
          <Form.Control
            as="select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formFilterPrice">
          <Form.Label>Rango de precios:</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="number"
              placeholder="Mínimo"
              min={0}
              step={0.01}
              value={filterPriceMin !== null ? filterPriceMin.toString() : ''}
              onChange={(e) => setFilterPriceMin(e.target.value ? parseFloat(e.target.value) : null)}
            />
            <span className="mx-2">-</span>
            <Form.Control
              type="number"
              placeholder="Máximo"
              min={0}
              step={0.01}
              value={filterPriceMax !== null ? filterPriceMax.toString() : ''}
              onChange={(e) => setFilterPriceMax(e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
        </Form.Group>
        <br />
        <Button type="submit">Filtrar</Button>
        <Button variant="btn btn-danger" onClick={handleClearFilter} className="ms-2">
          Limpiar
        </Button>
      </Form>
    </div>
  );
};

export default Filter;
