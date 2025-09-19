// DADOS DO QUIZ
const quizData = [
    {
        question: "1º Qual período do dia será o evento?",
        options: ["Manhã", "Tarde", "Crepúsculo", "Noite"],
        name: "periodo"
    },
    {
        question: "2º Qual será o tipo de evento?",
        options: ["Casual", "Encontro", "Reunião", "Ocasião Especial"],
        name: "evento"
    },
    {
        question: "3º Qual família de aromas mais te atrai?",
        options: ["Amadeirado", "Fresco/Cítrico", "Floral", "Adocicado/Oriental"],
        name: "familia"
    },
    {
        question: "4º Qual a intensidade que você busca?",
        options: ["Discreto", "Equilibrado", "Marcante"],
        name: "intensidade"
    },
    {
        question: "5º Que impressão você quer causar?",
        options: ["Elegante e Sofisticado(a)", "Moderno(a) e Criativo(a)", "Sedutor(a) e Misterioso(a)", "Alegre e Energizante"],
        name: "impressao"
    }
];

// PEGANDO OS ELEMENTOS DO HTML
const questionTitleElement = document.getElementById('question-title');
const optionsListElement = document.getElementById('options-list');
const nextButton = document.getElementById('next-button');
const mainTitleElement = document.getElementById('main-title');

// VARIÁVEIS DE CONTROLE
let currentQuestionIndex = 0;
let userAnswers = {};

// FUNÇÃO PARA CARREGAR A PERGUNTA E OPÇÕES
function loadQuestion() {
    optionsListElement.innerHTML = '';
    const currentQuestion = quizData[currentQuestionIndex];
    questionTitleElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const label = document.createElement('label');
        const uniqueId = `${currentQuestion.name}-${index}`;

        input.type = 'radio';
        input.name = currentQuestion.name;
        input.value = option.toLowerCase().replace(/[\s\/()]+/g, '_');
        input.id = uniqueId;

        label.htmlFor = uniqueId;
        label.textContent = option;
        
        // Adiciona na ordem correta para o CSS funcionar
        li.appendChild(input);
        li.appendChild(label);
        optionsListElement.appendChild(li);
    });
}

// AÇÃO DO BOTÃO "PRÓXIMO"
nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector(`input[name="${quizData[currentQuestionIndex].name}"]:checked`);
    
    if (!selectedOption) {
        alert("Por favor, selecione uma opção para continuar.");
        return;
    }

    userAnswers[quizData[currentQuestionIndex].name] = selectedOption.value;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        mainTitleElement.textContent = "Quiz finalizado! Redirecionando para seus resultados...";
        document.getElementById('question-block').style.display = 'none';
        nextButton.style.display = 'none';
        
        setTimeout(() => {
            window.location.href = 'resultados.html';
        }, 1500);
    }
});

// INICIAR O QUIZ
loadQuestion();