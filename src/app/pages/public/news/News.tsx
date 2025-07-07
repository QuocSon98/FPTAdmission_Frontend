import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const News: React.FC = () => {

    const [newsList, setNewsList] = useState([{
        name: '',
        description: '',
        majorId: '',
    }]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/major?page=0&size=1000', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                    },
                });
                if (!response.data) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.data;
                setNewsList(data.listData);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <>
            {
                newsList.map((item, index) => (
                    <div key={index} className="news-item">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>{item.majorId}</p>
                    </div>
                ))
            }
        </>

    )
}