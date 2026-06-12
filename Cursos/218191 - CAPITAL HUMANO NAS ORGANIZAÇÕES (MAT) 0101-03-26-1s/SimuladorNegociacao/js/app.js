let costChart, radarChart, doughnutChart;

// Gradients references
let costGradientPucaco, costGradientNegociacoOk, costGradientNegociacoFail, costGradientNegociacoWarn;

// --- Currency Formatter ---
function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    if (value === '') value = '0';
    let floatValue = parseFloat(value) / 100;
    input.value = floatValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    update();
}

function parseCurrency(str) {
    if (!str) return 0;
    let clean = str.replace(/\./g, '').replace(',', '.');
    return parseFloat(clean) || 0;
}

// --- Chart Initialization ---
function initCharts() {
    // Global chart theme adjustments for modern sleek HUD
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Outfit', sans-serif";
    Chart.defaults.font.size = 11;
    Chart.defaults.plugins.legend.labels.boxWidth = 8;
    Chart.defaults.plugins.legend.labels.padding = 12;
    Chart.defaults.plugins.legend.labels.color = '#e2e8f0';
    
    const ctxCost = document.getElementById('costChart').getContext('2d');
    
    // Create Premium Gradients for Cost Chart
    costGradientPucaco = ctxCost.createLinearGradient(0, 0, 0, 180);
    costGradientPucaco.addColorStop(0, '#64748b');
    costGradientPucaco.addColorStop(1, '#334155');
    
    costGradientNegociacoOk = ctxCost.createLinearGradient(0, 0, 0, 180);
    costGradientNegociacoOk.addColorStop(0, '#34d399');
    costGradientNegociacoOk.addColorStop(1, '#059669');
    
    costGradientNegociacoFail = ctxCost.createLinearGradient(0, 0, 0, 180);
    costGradientNegociacoFail.addColorStop(0, '#f87171');
    costGradientNegociacoFail.addColorStop(1, '#dc2626');
    
    costGradientNegociacoWarn = ctxCost.createLinearGradient(0, 0, 0, 180);
    costGradientNegociacoWarn.addColorStop(0, '#fbbf24');
    costGradientNegociacoWarn.addColorStop(1, '#d97706');
    
    // 1. Bar Chart: Cost Comparison
    costChart = new Chart(ctxCost, {
        type: 'bar',
        data: {
            labels: ['Pucaço (Base)', 'NegociAço (Atual)'],
            datasets: [{
                data: [250000, 250000],
                backgroundColor: [costGradientPucaco, costGradientNegociacoOk],
                borderRadius: 6,
                barPercentage: 0.45,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    borderWidth: 1,
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc',
                    callbacks: {
                        label: function(context) {
                            return ' Custo: R$ ' + context.raw.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.03)', drawTicks: false },
                    border: { display: false },
                    ticks: {
                        color: '#64748b',
                        callback: function(value) {
                            return 'R$ ' + (value / 1000) + 'k';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { color: '#94a3b8', font: { weight: '600' } }
                }
            }
        }
    });

    // 2. Radar Chart: Multidimensional Metrics Score
    // Using mapped scores [30, 100] to prevent the line from collapsing/plunging to 0 at the center (tirando a descida brusca)
    const ctxRadar = document.getElementById('radarChart').getContext('2d');
    radarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Preço Atrativo', 'Prazo Lote 1', 'Prazo Lote 2', 'Prazo Pgto'],
            datasets: [
                {
                    label: 'Pucaço (Base)',
                    data: [65, 30, 66, 65], // Mapped scores corresponding to Pucaço's actual values
                    backgroundColor: 'rgba(148, 163, 184, 0.03)',
                    borderColor: 'rgba(148, 163, 184, 0.5)',
                    pointBackgroundColor: '#64748b',
                    pointBorderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1.5,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: 'Oferta Atual',
                    data: [65, 65, 65, 65],
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    borderColor: '#38bdf8',
                    pointBackgroundColor: '#38bdf8',
                    pointBorderColor: '#020617',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#e2e8f0' }
                }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    pointLabels: {
                        color: '#94a3b8',
                        font: { size: 10, weight: '600' }
                    },
                    ticks: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });

    // 3. Doughnut Chart: Logistical split
    const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
    doughnutChart = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Lote 1 (Urgente)', 'Lote 2 (Saldo)', 'Déficit (Falta)'],
            datasets: [{
                data: [30, 20, 0],
                backgroundColor: ['#10b981', '#38bdf8', '#f43f5e'],
                borderWidth: 2,
                borderColor: '#0b0f19',
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%', // Thinner and sleeker doughnut
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8', padding: 10 }
                }
            }
        }
    });
}

// --- Business Logic for Radar Scores (Mapped to floor 30% to prevent polygon collapse) ---
function calculateRadarScores(p, l1Q, l1D, l2Q, l2D, pt) {
    // 1. Preço: R$ 5000 = 50. R$ 4000 = 100. R$ 6000 = 0.
    let scorePrice = Math.max(0, Math.min(100, 100 - ((p - 4000) / 2000 * 100)));
    
    // 2. Prazo Lote 1: > 15 dias = 0. 7 dias = 50. 1 dia = 100.
    let scoreL1Time = 0;
    if (l1D <= 15) {
        scoreL1Time = Math.max(0, Math.min(100, 100 - ((l1D - 1) / 14 * 100)));
    }
    
    // 3. Prazo Lote 2: > 30 dias = 0. 19 dias = 50. 1 dia = 100.
    let scoreL2Time = 0;
    if (l2D <= 30) {
        scoreL2Time = Math.max(0, Math.min(100, 100 - ((l2D - 1) / 29 * 100)));
    }
    
    // 4. Pagamento: 0 dias = 0. 30 dias = 50. 60 dias = 100.
    let scorePayment = Math.max(0, Math.min(100, pt / 60 * 100));
    
    // Scale [0, 100] -> [30, 100] to avoid the chart line plunging to 0 at the center
    const map = (s) => 30 + (s * 0.7);
    
    return [map(scorePrice), map(scoreL1Time), map(scoreL2Time), map(scorePayment)];
}

// --- Core Update Function ---
function update() {
    // Extract inputs
    const price = parseCurrency(document.getElementById('price').value);
    const paymentTime = parseFloat(document.getElementById('paymentTime').value) || 0;
    const qualityAssured = document.getElementById('qualityAssured').value === 'yes';
    
    const l1Qty = parseFloat(document.getElementById('l1Quantity').value) || 0;
    const l1Del = parseFloat(document.getElementById('l1Delivery').value) || 0;
    
    const l2Qty = parseFloat(document.getElementById('l2Quantity').value) || 0;
    const l2Del = parseFloat(document.getElementById('l2Delivery').value) || 0;
    
    const totalQty = l1Qty + l2Qty;
    const totalCost = price * totalQty;
    
    // Proportional costDiff: economy or loss based on negotiated quantity
    const costDiff = (5000 - price) * totalQty;
    
    // Compliance flags
    const isL1QtyOk = l1Qty >= 30;
    const isL1TimeOk = l1Del <= 7;
    const isL2TimeOk = l2Del <= 19;
    const isTotalQtyOk = totalQty >= 50;
    const isPriceOk = price <= 5000;
    const isPaymentOk = paymentTime >= 30;
    const isQualityOk = qualityAssured;
    
    // Veredicto Logic
    let state = 'v-ok'; // v-ok, v-warn, v-fail
    let verText = 'CONTRATO APROVADO';
    
    // Critical failure conditions (operational stopper)
    if (!isL1QtyOk || !isL1TimeOk || !isL2TimeOk || !isTotalQtyOk || !isQualityOk) {
        state = 'v-fail';
        verText = 'RECUSAR PROPOSTA';
    } 
    // Commercial alert conditions (operational ok, but pricing or terms are subpar)
    else if (!isPriceOk || !isPaymentOk) {
        state = 'v-warn';
        verText = 'ALERTA: NEGOCIAR COMERCIAL';
    }
    
    // --- Update UI Checklist ---
    const updateCheck = (id, isOk, okMsg, failMsg) => {
        const el = document.getElementById(id);
        if (isOk) {
            el.className = 'check-item ok';
            el.innerHTML = `<span class="icon font-mono">✓</span> ${okMsg}`;
        } else {
            el.className = 'check-item fail';
            el.innerHTML = `<span class="icon font-mono">✗</span> ${failMsg}`;
        }
    };
    
    updateCheck('chk-quality', isQualityOk, 'Garantia de qualidade confirmada', 'Sem garantia de qualidade (Risco Crítico)');
    updateCheck('chk-l1-qty', isL1QtyOk, `Lote 1 Mínimo de 30t atendido (${l1Qty}t)`, `Lote 1 abaixo de 30t (${l1Qty}t)`);
    updateCheck('chk-l1-time', isL1TimeOk, `Prazo Lote 1 dentro de 7d (${l1Del}d)`, `Prazo Lote 1 excede 7d (${l1Del}d)`);
    updateCheck('chk-l2-time', isL2TimeOk, `Prazo Lote 2 dentro dos 19d limite (${l2Del}d)`, `Prazo Lote 2 excede 19d (${l2Del}d)`);
    updateCheck('chk-total-qty', isTotalQtyOk, `Volume total de 50t garantido (${totalQty}t)`, `Volume total insuficiente (${totalQty}t / 50t)`);
    updateCheck('chk-price', isPriceOk, `Preço viável vs Pucaço (R$ ${price.toLocaleString('pt-BR', {minimumFractionDigits: 2})})`, `Preço acima do Benchmark (R$ ${price.toLocaleString('pt-BR', {minimumFractionDigits: 2})})`);

    // --- Update Verdict Container Glow and Theme ---
    const verdContainer = document.getElementById('verdict-container');
    const verdGlow = verdContainer.querySelector('.verdict-glow');
    const verdTitle = document.getElementById('verdict-title');
    
    verdContainer.className = `verdict-card ${state}`;
    verdGlow.className = `verdict-glow ${state}-glow`;
    verdTitle.innerText = verText;
    
    // --- Update KPI Cards ---
    
    // KPI 1: Lote 1 status
    const kpiL1 = document.getElementById('kpi-l1');
    const valL1 = document.getElementById('val-l1');
    const subL1 = document.getElementById('sub-l1');
    if (!isL1TimeOk) {
        kpiL1.className = 'kpi-card status-fail';
        valL1.innerText = 'PARADA CRÍTICA';
        subL1.innerText = `Lote 1 em ${l1Del} dias (Excede 7d)`;
    } else if (!isL1QtyOk) {
        kpiL1.className = 'kpi-card status-fail';
        valL1.innerText = 'VOL. INSUFICIENTE';
        subL1.innerText = `Apenas ${l1Qty} Ton (Necessita 30t)`;
    } else {
        kpiL1.className = 'kpi-card status-ok';
        valL1.innerText = 'PRODUÇÃO ATENDIDA';
        subL1.innerText = `${l1Qty} Ton entregues em ${l1Del} dias`;
    }
    
    // KPI 2: Lote 2 status
    const kpiL2 = document.getElementById('kpi-l2');
    const valL2 = document.getElementById('val-l2');
    const subL2 = document.getElementById('sub-l2');
    if (!isL2TimeOk) {
        kpiL2.className = 'kpi-card status-fail';
        valL2.innerText = 'CRONOGRAMA ADIADO';
        subL2.innerText = `Entrega em ${l2Del} dias (Limite 19d)`;
    } else {
        kpiL2.className = 'kpi-card status-ok';
        valL2.innerText = 'CRONOGRAMA SEGURO';
        subL2.innerText = `${l2Qty} Ton entregues em ${l2Del} dias`;
    }
    
    // KPI 3: Preço/Economia status
    const kpiPrice = document.getElementById('kpi-price');
    const valPrice = document.getElementById('val-price');
    const subPrice = document.getElementById('sub-price');
    if (costDiff > 0) {
        kpiPrice.className = 'kpi-card status-ok';
        valPrice.innerText = `+ R$ ${costDiff.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        subPrice.innerText = 'Economia em relação ao Pucaço';
    } else if (costDiff === 0) {
        kpiPrice.className = 'kpi-card status-warn';
        valPrice.innerText = 'R$ 0,00';
        subPrice.innerText = 'Empate exato com o Pucaço';
    } else {
        kpiPrice.className = 'kpi-card status-fail';
        valPrice.innerText = `- R$ ${Math.abs(costDiff).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        subPrice.innerText = 'Prejuízo vs Benchmark Pucaço';
    }
    
    // KPI 4: Pagamento status
    const kpiPayment = document.getElementById('kpi-payment');
    const valPayment = document.getElementById('val-payment');
    const subPayment = document.getElementById('sub-payment');
    valPayment.innerText = paymentTime === 0 ? 'À VISTA' : `${paymentTime} DIAS PGTO`;
    if (!isPaymentOk) {
        kpiPayment.className = 'kpi-card status-warn';
        subPayment.innerText = 'Pior que a Base. Exigir redução de preço!';
    } else {
        kpiPayment.className = 'kpi-card status-ok';
        subPayment.innerText = paymentTime === 30 ? 'Padrão da base mantido' : 'Fluxo de caixa otimizado';
    }
    
    // --- Update Chart.js Graphics ---
    if (costChart && radarChart && doughnutChart) {
        // 1. Cost Bar Chart Update
        costChart.data.datasets[0].data[1] = totalCost;
        
        // Pick proper gradient for current offer bar
        let currentBarGradient = costGradientNegociacoOk;
        if (costDiff < 0) {
            currentBarGradient = costGradientNegociacoFail;
        } else if (costDiff === 0) {
            currentBarGradient = costGradientNegociacoWarn;
        }
        
        costChart.data.datasets[0].backgroundColor = [costGradientPucaco, currentBarGradient];
        costChart.update();
        
        // 2. Radar Chart Update
        radarChart.data.datasets[1].data = calculateRadarScores(price, l1Qty, l1Del, l2Qty, l2Del, paymentTime);
        const radarColor = state === 'v-fail' ? '#f43f5e' : (state === 'v-warn' ? '#f59e0b' : '#38bdf8');
        const radarFill = state === 'v-fail' ? 'rgba(244, 63, 94, 0.12)' : (state === 'v-warn' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(56, 189, 248, 0.12)');
        
        radarChart.data.datasets[1].borderColor = radarColor;
        radarChart.data.datasets[1].backgroundColor = radarFill;
        radarChart.data.datasets[1].pointBackgroundColor = radarColor;
        radarChart.update();
        
        // 3. Doughnut Chart Update
        let deficit = Math.max(0, 50 - totalQty);
        doughnutChart.data.datasets[0].data = [l1Qty, l2Qty, deficit];
        doughnutChart.update();
    }
}

// --- DOM Loaded Listener ---
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    update();
    
    // Add real-time event listeners to all input boxes
    ['paymentTime', 'l1Quantity', 'l1Delivery', 'l2Quantity', 'l2Delivery', 'qualityAssured'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', update);
        }
    });

    // Auto-update Lote 2 quantity when Lote 1 quantity changes to sum exactly 50 tons
    const l1QtyInput = document.getElementById('l1Quantity');
    const l2QtyInput = document.getElementById('l2Quantity');
    if (l1QtyInput && l2QtyInput) {
        l1QtyInput.addEventListener('input', () => {
            const l1Val = parseFloat(l1QtyInput.value) || 0;
            l2QtyInput.value = Math.max(0, 50 - l1Val);
            update();
        });
    }

    // Custom Dropdown Logic
    const dropdown = document.getElementById('qualityDropdown');
    if (dropdown) {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const options = dropdown.querySelectorAll('.dropdown-option');
        const input = document.getElementById('qualityAssured');

        // Sync initial state
        dropdown.setAttribute('data-value', input.value);

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const val = option.getAttribute('data-value');
                input.value = val;
                dropdown.setAttribute('data-value', val);
                
                // Update trigger text
                dropdown.querySelector('.selected-value').innerText = option.innerText;
                
                // Update selected styling
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                dropdown.classList.remove('open');
                
                // Dispatch input event to trigger calculation updates
                input.dispatchEvent(new Event('input'));
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.remove('open');
        });
    }
});

