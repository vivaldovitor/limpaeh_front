import React from 'react';

function Unauthorized() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Acesso Negado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
        </div>
    );
}

export default Unauthorized;
