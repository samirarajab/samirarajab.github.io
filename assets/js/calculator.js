// calculadora.js
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("calculatorPopup");
    const openBtn = document.getElementById("openCalculator");
    const closeBtn = popup.querySelector(".close");
  
    const inputs = {
      initialAmount: document.getElementById("initialAmount"),
      monthlyContribution: document.getElementById("monthlyContribution"),
      period: document.getElementById("period"),
      percentCDI: document.getElementById("percentCDI"),
    };
  
    const resultBody = document.getElementById("resultBody");
  
    const investimentos = [
      { nome: "Poupança", cdi: 0.0783, isento: true },
      { nome: "CDB/RDB", cdi: 0.1167, isento: false },
      { nome: "LCI/LCA", cdi: 0.1415, isento: true },
      { nome: "Tes. Direto", cdi: 0.1167, isento: false },
    ];
  
    // Máscara pt-BR
    function formatCurrencyInput(input) {
      let value = input.value.replace(/\D/g, "");
      value = (parseInt(value, 10) / 100).toFixed(2);
      input.value = value
        .toLocaleString("pt-BR", { minimumFractionDigits: 2 })
        .replace(".", ",");
    }
  
    function parseCurrency(value) {
      return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
    }
  
    [inputs.initialAmount, inputs.monthlyContribution].forEach(input => {
      input.addEventListener("input", () => formatCurrencyInput(input));
    });
  
    function calcular() {
      const inicial = parseCurrency(inputs.initialAmount.value);
      const aporte = parseCurrency(inputs.monthlyContribution.value);
      const meses = parseInt(inputs.period.value) || 12;
      const percentualCDI = parseFloat(inputs.percentCDI.value) || 100;
  
      resultBody.innerHTML = "";
  
      investimentos.forEach(({ nome, cdi, isento }) => {
        const taxa = (cdi * percentualCDI) / 100;
        let montante = inicial;
  
        for (let i = 0; i < meses; i++) {
          montante = (montante + aporte) * (1 + taxa / 12);
        }
  
        const bruto = montante;
        const liquido = isento ? bruto : bruto * 0.963; // imposto 3.7%
        const totalInvestido = inicial + aporte * meses;
        const lucro = liquido - totalInvestido;
        const percLucro = (lucro / totalInvestido) * 100;
        const rentabilidadeAnual = taxa * 100;
  
        resultBody.innerHTML += `
          <tr>
            <td>${nome}</td>
            <td>R$${bruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
            <td>R$${liquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
            <td>R$${lucro.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
            <td>${percLucro.toFixed(2)}%</td>
            <td>${rentabilidadeAnual.toFixed(2)}%</td>
          </tr>
        `;
      });
    }
  
    [inputs.initialAmount, inputs.monthlyContribution, inputs.period, inputs.percentCDI].forEach(input =>
      input.addEventListener("input", calcular)
    );
  
    openBtn.addEventListener("click", () => popup.style.display = "flex");
    closeBtn.addEventListener("click", () => popup.style.display = "none");
    window.addEventListener("click", e => {
      if (e.target === popup) popup.style.display = "none";
    });
  
    // Executa cálculo inicial caso valores estejam preenchidos
    calcular();
  });
  