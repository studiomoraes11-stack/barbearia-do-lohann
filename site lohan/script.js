// --- Serviços com valores ---
const servicosValores = {
    "Corte": 35,
    "Barba": 15,
    "Cabelo + Barba": 40,
    "Pezinho": 15,
    "Luzes": 60,
    "Relaxamento": 60,
    "Nevou": 90
};

// --- Horários disponíveis ---
let horarios = [];
for (let h = 8; h <= 20; h++) {
    horarios.push(`${h.toString().padStart(2,'0')}:00`);
    if (h < 20) horarios.push(`${h.toString().padStart(2,'0')}:30`);
}

// --- Função para preencher horário sem repetição ---
function preencherHorarios() {
    const horarioSelect = document.getElementById("horario");
    horarioSelect.innerHTML = '<option value="">Selecione</option>';

    let ocupados = JSON.parse(localStorage.getItem("horariosOcupados") || "[]");

    horarios.forEach(h => {
        if (!ocupados.includes(h)) {
            const option = document.createElement("option");
            option.value = h;
            option.textContent = h;
            horarioSelect.appendChild(option);
        }
    });
}

// --- Preencher serviço se vier da página principal ---
const urlParams = new URLSearchParams(window.location.search);
const servicoSelecionado = urlParams.get("servico");
if (servicoSelecionado) {
    document.getElementById("servico").value = servicoSelecionado;
}

// --- Preencher horários ---
preencherHorarios();

// --- Agendamento ---
const form = document.getElementById("form-agendamento");
const confirmacao = document.getElementById("confirmacao");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const servico = document.getElementById("servico").value;
    const barbeiro = document.getElementById("barbeiro").value;
    const horario = document.getElementById("horario").value;
    const valor = servicosValores[servico];

    if(!horario) {
        alert("Escolha um horário disponível!");
        return;
    }

    // Salvar horário como ocupado
    let ocupados = JSON.parse(localStorage.getItem("horariosOcupados") || "[]");
    ocupados.push(horario);
    localStorage.setItem("horariosOcupados", JSON.stringify(ocupados));

    confirmacao.textContent = `Agendamento confirmado!
Nome: ${nome}, Serviço: ${servico} (R$${valor}), Barbeiro: ${barbeiro}, Horário: ${horario}`;

    form.reset();
    document.getElementById("servico").value = servico; // manter serviço
    preencherHorarios(); // atualizar horários disponíveis
});
