
const taxasTotais = {
    1: 0.1360, // 13,60%
    2: 0.1460, // 14,60%
    3: 0.1560, // 15,60%
    4: 0.1640, // 16,40%
    5: 0.1700, // 17%
    6: 0.1760, // 17,60%
    7: 0.1820, // 18,20%
    8: 0.1860, // 18,60%
    9: 0.1900, // 19%
    10: 0.1960, // 19,60%
    11: 0.1980, // 19,80%
    12: 0.2000, // 20%
    13: 0.2200, // 22%
    14: 0.2360, // 23,60%
    15: 0.2520, // 25,20%
    16: 0.2680, // 26,80%
    17: 0.2840, // 28,40%
    18: 0.3000  // 30%
};


(function preencherOpcoesDeParcela() {
    const selectParcelas = document.getElementById('parcelas');
    for (const numParcela in taxasTotais) {
        let option = document.createElement('option');
        option.value = numParcela;
        option.textContent = `${numParcela}x`;
        selectParcelas.appendChild(option);
    }
})();


function formatarDinheiro(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


function calcular() {
    const valorLiquido = parseFloat(document.getElementById('valorDesejado').value);
    const numParcelas = parseInt(document.getElementById('parcelas').value);
    const resultadoDiv = document.getElementById('resultado');

    if (isNaN(valorLiquido) || valorLiquido <= 0) {
        resultadoDiv.innerHTML = "<p style='color:red;'>Por favor, insira um valor válido para calcular.</p>";
        resultadoDiv.classList.add('visivel');
        return;
    }

    const taxaTotal = taxasTotais[numParcelas];

   
    
   
    const valorBrutoInicial = valorLiquido * (1 + taxaTotal);
    
  
    const descontoTotal = numParcelas * 0.01;
    
    
    const valorBrutoFinal = valorBrutoInicial - descontoTotal;


    const valorParcela = valorBrutoFinal / numParcelas;
    const custoTotal = valorBrutoFinal - valorLiquido;
    
    
    resultadoDiv.innerHTML = `
        <h3>Resumo da Simulação:</h3>
        <p>Você Pagará: <strong>${numParcelas}x de ${formatarDinheiro(valorParcela)}</strong></p>
        <hr>
        <p>Você: <strong>${formatarDinheiro(valorLiquido)}</strong></p>
     
    `;
    resultadoDiv.classList.add('visivel');
    
   
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
}

