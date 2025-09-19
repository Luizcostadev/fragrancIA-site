document.addEventListener('DOMContentLoaded', () => {
    // Pegando os elementos do Modal
    const modalBackdrop = document.getElementById('modal-backdrop');
    const perfumeModal = document.getElementById('perfume-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalContent = document.getElementById('modal-content');

    // Pegando TODOS os botões de "Ver Detalhes"
    const detailButtons = document.querySelectorAll('.view-details-btn');

    // Função para fechar o modal
    const closeModal = () => {
        modalBackdrop.classList.add('hidden');
        perfumeModal.classList.add('hidden');
    };

    // Adicionando o evento de clique para cada botão
    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o link de fazer qualquer coisa

            // Pega o card de perfume mais próximo do botão clicado
            const card = event.target.closest('.perfume-card');
            
            // Pega as informações do card
            const title = card.querySelector('h3').textContent;
            const brand = card.querySelector('.brand').textContent;
            const description = card.querySelector('.description').textContent;
            const imgSrc = card.querySelector('img').src;

            // Cria o conteúdo HTML para o modal
            modalContent.innerHTML = `
                <div style="display: flex; gap: 2rem; align-items: center;">
                    <img src="${imgSrc}" alt="${title}" style="width: 150px; height: 150px; object-fit: contain; border-radius: 10px;">
                    <div>
                        <h2 style="color: #d4af37; margin-bottom: 0.5rem;">${title}</h2>
                        <h3 style="color: #fff; margin-bottom: 1rem; font-weight: 400;">${brand}</h3>
                        <p>${description} Detalhes adicionais sobre a história e a inspiração deste perfume poderiam ser adicionados aqui.</p>
                    </div>
                </div>
            `;

            // Mostra o modal
            modalBackdrop.classList.remove('hidden');
            perfumeModal.classList.remove('hidden');
        });
    });

    // Eventos para fechar o modal
    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
});