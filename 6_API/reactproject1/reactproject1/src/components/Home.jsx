import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
    const [items, setItems] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const apiUrl = 'https://localhost:5001/api/products';

    const getProducts = () => {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setItems(data))
            .catch(error => {
                console.error('Blad podczas pobierania produktow:', error);
            });
    };

    const deleteProduct = (id) => {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        alert('Produkt o podanym ID nie zostal znaleziony');
                    } else {
                        alert('Wystapi³ blad podczas usuwania produktu');
                    }
                    throw new Error('Blad podczas usuwania');
                }
                getProducts();
            })
            .catch(err => console.error("Blad:", err));
    };

    const handleNewProductNameChange = (event) => {
        setNewProductName(event.target.value);
    };

    const handleEditProductNameChange = (event) => {
        setEditingProduct({
            ...editingProduct,
            name: event.target.value
        });
    };

    const handleEditProductStockChange = (event) => {
        setEditingProduct({
            ...editingProduct,
            inStock: event.target.checked
        });
    };

    const startEditing = (product) => {
        setEditingProduct({ ...product });
    };

    const cancelEditing = () => {
        setEditingProduct(null);
    };

    const saveProduct = () => {
        if (!newProductName.trim()) {
            alert('Nazwa produktu nie moze byc pusta!');
            return;
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newProductName, inStock: false })
        })
            .then(response => {
                if (!response.ok) {
                    alert('Blad! Nie udalo sie dodac produktu');
                    throw new Error('Blad podczas dodawania produktu');
                }
                setNewProductName('');
                getProducts();
            })
            .catch(err => console.error("Blad:", err));
    };

    const saveEditedProduct = () => {
        if (!editingProduct.name.trim()) {
            alert('Nazwa produktu nie moze byc pusta!');
            return;
        }

        fetch(`${apiUrl}/${editingProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingProduct)
        })
            .then(response => {
                if (!response.ok) {
                    alert('Blad! Nie udalo sie zaktualizowac produktu');
                    throw new Error('Blad podczas aktualizacji produktu');
                }
                setEditingProduct(null);
                getProducts();
            })
            .catch(err => console.error("Blad:", err));
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="products-container">
            <h2>Lista produktow</h2>

            <div className="product-form">
                <input
                    type="text"
                    value={newProductName}
                    onChange={handleNewProductNameChange}
                    placeholder="Wpisz nazwe nowego produktu"
                    className="product-input"
                />
                <button
                    className="save-btn"
                    onClick={saveProduct}
                >
                    Dodaj
                </button>
            </div>

            <div className="products-list">
                {items.length === 0 ? (
                    <p>Brak produktow do wyswietlenia</p>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="product-item">
                            {editingProduct && editingProduct.id === item.id ? (
                                <div className="edit-form">
                                    <div className="info-container">
                                        <input
                                            type="text"
                                            value={editingProduct.name}
                                            onChange={handleEditProductNameChange}
                                            className="product-input"
                                        />
                                        <div className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                id={`inStock-${item.id}`}
                                                checked={editingProduct.inStock}
                                                onChange={handleEditProductStockChange}
                                            />
                                            <label htmlFor={`inStock-${item.id}`}>W magazynie</label>
                                        </div>
                                    </div>
                                    <div className="edit-buttons">
                                        <button
                                            className="save-btn"
                                            onClick={saveEditedProduct}
                                        >
                                            Zapisz
                                        </button>
                                        <button
                                            className="cancel-btn"
                                            onClick={cancelEditing}
                                        >
                                            Anuluj
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="product-info">
                                        <span className="product-name">{item.name}</span>
                                        <span className="product-stock">
                                            {item.inStock ? 'W magazynie' : 'Brak w magazynie'}
                                        </span>
                                    </div>
                                    <div className="product-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => startEditing(item)}
                                        >
                                            Edytuj
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteProduct(item.id)}
                                        >
                                            Usun
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
