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
    const isL2TimeOk = l2Qty === 0 || l2Del <= 19; // If Lote 2 has 0 tons, delivery time is irrelevant
    const isTotalQtyOk = totalQty >= 50;
    const isPriceOk = price <= 5000;
    const isPaymentOk = paymentTime >= 30;
    const isQualityOk = qualityAssured;
    
    // Payment term compliance or price compensation (assuming 12% annual cost of capital)
    const priceDiscount = (5000 - price) * totalQty;
    const paymentLoss = totalCost * Math.max(0, 30 - paymentTime) * 0.00033;
    const isPaymentCompensated = isPaymentOk || (price < 5000 && priceDiscount >= paymentLoss);
    
    // Veredicto Logic
    let state = 'v-ok'; // v-ok, v-warn, v-fail
    let verText = 'CONTRATO APROVADO';
    
    // Critical failure conditions (operational stopper)
    if (!isL1QtyOk || !isL1TimeOk || !isL2TimeOk || !isTotalQtyOk || !isQualityOk) {
        state = 'v-fail';
        verText = 'RECUSAR PROPOSTA';
    } 
    // Commercial alert conditions (operational ok, but pricing or terms are subpar and not compensated)
    else if (!isPriceOk || !isPaymentCompensated) {
        state = 'v-warn';
        verText = 'ALERTA: NEGOCIAR COMERCIAL';
    }
    
    // --- Update UI Checklist ---
    const updateCheck = (id, isOk, okMsg, failMsg) => {
        const el = document.getElementById(id);
        const text = isOk ? okMsg : failMsg;
        if (isOk) {
            el.className = 'check-item ok';
            el.innerHTML = `<span class="icon font-mono">✓</span><span class="check-text">${text}</span>`;
        } else {
            el.className = 'check-item fail';
            el.innerHTML = `<span class="icon font-mono">✗</span><span class="check-text">${text}</span>`;
        }
    };
    
    updateCheck('chk-quality', isQualityOk, 'Garantia de qualidade confirmada', 'Sem garantia de qualidade (Risco Crítico)');
    updateCheck('chk-l1-qty', isL1QtyOk, `Lote 1 Mínimo de 30t atendido (${l1Qty}t)`, `Lote 1 abaixo de 30t (${l1Qty}t)`);
    updateCheck('chk-l1-time', isL1TimeOk, `Prazo Lote 1 dentro de 7d (${l1Del}d)`, `Prazo Lote 1 excede 7d (${l1Del}d)`);
    if (l2Qty === 0) {
        updateCheck('chk-l2-time', true, 'Lote 2 dispensado (Demanda suprida no Lote 1)', '');
    } else {
        updateCheck('chk-l2-time', isL2TimeOk, `Prazo Lote 2 dentro dos 19d limite (${l2Del}d)`, `Prazo Lote 2 excede 19d (${l2Del}d)`);
    }
    updateCheck('chk-total-qty', isTotalQtyOk, `Volume total de 50t garantido (${totalQty}t)`, `Volume total insuficiente (${totalQty}t / 50t)`);
    updateCheck('chk-price', isPriceOk, `Preço viável vs Pucaço (R$ ${price.toLocaleString('pt-BR', {minimumFractionDigits: 2})})`, `Preço acima do Benchmark (R$ ${price.toLocaleString('pt-BR', {minimumFractionDigits: 2})})`);
    updateCheck('chk-payment', isPaymentCompensated, paymentTime >= 30 ? `Prazo de faturamento viável (${paymentTime}d)` : `Prazo de ${paymentTime}d compensado pelo desconto`, `Prazo de faturamento de ${paymentTime}d insuficiente (Sem compensação)`);

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
    if (l2Qty === 0) {
        kpiL2.className = 'kpi-card status-ok';
        valL2.innerText = 'DISPENSADO';
        subL2.innerText = 'Volume total alocado no Lote 1';
    } else if (!isL2TimeOk) {
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
        if (price < 5000) {
            subPayment.innerText = 'Pior que a Base, mas compensado pelo desconto';
        } else {
            subPayment.innerText = 'Pior que a Base. Exigir redução de preço!';
        }
    } else {
        kpiPayment.className = 'kpi-card status-ok';
        subPayment.innerText = paymentTime === 30 ? 'Padrão da base mantido' : 'Fluxo de caixa otimizado';
    }
    
    // --- Update Chart.js Graphics ---
    if (costChart && radarChart && doughnutChart) {
        // 1. Cost Bar Chart Update
        costChart.data.datasets[0].data[0] = 250000; // Pucaço (Base) constant cost of 250k
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
    
    // --- Pontuação de Negociação (Gamificação) ---
    // 1. Preço: R$ 4000 (100%) a R$ 6000 (0%)
    let sPrice = Math.max(0, Math.min(100, 100 - ((price - 4000) / 2000 * 100)));
    
    // 2. Pagamento: 0 dias (0%) a 60 dias (100%)
    let sPayment = Math.max(0, Math.min(100, paymentTime / 60 * 100));
    
    // 3. Prazo Lote 1: 15 dias (0%) a 1 dia (100%)
    let sL1Time = 0;
    if (l1Del <= 15) {
        sL1Time = Math.max(0, Math.min(100, 100 - ((l1Del - 1) / 14 * 100)));
    }
    
    // 4. Prazo Lote 2: 30 dias (0%) a 1 dia (100%)
    let sL2Time = 100; // Default to 100% if Lote 2 quantity is 0
    if (l2Qty > 0 && l2Del <= 30) {
        sL2Time = Math.max(0, Math.min(100, 100 - ((l2Del - 1) / 29 * 100)));
    } else if (l2Qty > 0 && l2Del > 30) {
        sL2Time = 0;
    }
    
    // Weighted overall score
    let overallScore = (sPrice * 0.40) + (sPayment * 0.20) + (sL1Time * 0.20) + (sL2Time * 0.20);
    
    // Apply 70% penalty if the deal fails operational checklist constraints (Veredicto Vermelho)
    if (state === 'v-fail') {
        overallScore = overallScore * 0.3;
    }
    
    // Update Score UI elements
    const scoreBar = document.getElementById('score-bar');
    const scoreVal = document.getElementById('score-value');
    if (scoreBar && scoreVal) {
        const roundedScore = Math.round(overallScore);
        scoreVal.innerText = `${roundedScore}%`;
        scoreBar.style.width = `${overallScore}%`;
        
        // Apply dynamic theme colors and glows
        if (state === 'v-fail') {
            scoreBar.style.background = 'var(--danger)';
            scoreBar.style.boxShadow = '0 0 10px var(--danger-glow)';
            scoreVal.style.color = 'var(--danger)';
            scoreVal.style.textShadow = '0 0 10px var(--danger-glow)';
        } else if (state === 'v-warn') {
            scoreBar.style.background = 'var(--warning)';
            scoreBar.style.boxShadow = '0 0 10px var(--warning-glow)';
            scoreVal.style.color = 'var(--warning)';
            scoreVal.style.textShadow = '0 0 10px var(--warning-glow)';
        } else {
            scoreBar.style.background = 'var(--success)';
            scoreBar.style.boxShadow = '0 0 10px var(--success-glow)';
            scoreVal.style.color = 'var(--success)';
            scoreVal.style.textShadow = '0 0 10px var(--success-glow)';
        }
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

    // Auto-fill Benchmark on Click
    const benchmarkPill = document.getElementById('benchmarkPill');
    if (benchmarkPill) {
        benchmarkPill.addEventListener('click', () => {
            const priceInput = document.getElementById('price');
            const paymentInput = document.getElementById('paymentTime');
            const qualityInput = document.getElementById('qualityAssured');
            const l1QtyInput = document.getElementById('l1Quantity');
            const l1DelInput = document.getElementById('l1Delivery');
            const l2QtyInput = document.getElementById('l2Quantity');
            const l2DelInput = document.getElementById('l2Delivery');
            
            if (priceInput) priceInput.value = "5.000,00";
            if (paymentInput) paymentInput.value = "30";
            if (l1QtyInput) l1QtyInput.value = "20";
            if (l1DelInput) l1DelInput.value = "15";
            if (l2QtyInput) l2QtyInput.value = "30";
            if (l2DelInput) l2DelInput.value = "15";
            
            if (qualityInput) {
                qualityInput.value = "yes";
                // Sync custom dropdown UI
                const dropdownEl = document.getElementById('qualityDropdown');
                if (dropdownEl) {
                    dropdownEl.setAttribute('data-value', "yes");
                    const selectedValEl = dropdownEl.querySelector('.selected-value');
                    if (selectedValEl) selectedValEl.innerText = "Sim (Aço Certificado)";
                    
                    const options = dropdownEl.querySelectorAll('.dropdown-option');
                    options.forEach(opt => {
                        if (opt.getAttribute('data-value') === "yes") {
                            opt.classList.add('selected');
                        } else {
                            opt.classList.remove('selected');
                        }
                    });
                }
            }
            
            update();
        });
    }

    // Modal Logic for Formula Explanation
    const formulaModal = document.getElementById('formulaModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (formulaModal && openModalBtn && closeModalBtn) {
        openModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            formulaModal.classList.add('active');
        });

        closeModalBtn.addEventListener('click', () => {
            formulaModal.classList.remove('active');
        });

        // Close modal when clicking outside of the content card
        formulaModal.addEventListener('click', (e) => {
            if (e.target === formulaModal) {
                formulaModal.classList.remove('active');
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                formulaModal.classList.remove('active');
            }
        });
    }

    // Modal Logic for Benchmark Explanation
    const benchmarkModal = document.getElementById('benchmarkModal');
    const openBenchmarkModalBtn = document.getElementById('openBenchmarkModalBtn');
    const closeBenchmarkModalBtn = document.getElementById('closeBenchmarkModalBtn');

    if (benchmarkModal && openBenchmarkModalBtn && closeBenchmarkModalBtn) {
        openBenchmarkModalBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique no "?" também dispare o preenchimento automático do Benchmark
            benchmarkModal.classList.add('active');
        });

        closeBenchmarkModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            benchmarkModal.classList.remove('active');
        });

        // Close modal when clicking outside of the content card
        benchmarkModal.addEventListener('click', (e) => {
            if (e.target === benchmarkModal) {
                benchmarkModal.classList.remove('active');
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                benchmarkModal.classList.remove('active');
            }
        });
    }

    // Modal Logic for SuperMotors Explanation
    const superMotorsModal = document.getElementById('superMotorsModal');
    const openSuperMotorsModalBtn = document.getElementById('openSuperMotorsModalBtn');
    const closeSuperMotorsModalBtn = document.getElementById('closeSuperMotorsModalBtn');

    if (superMotorsModal && openSuperMotorsModalBtn && closeSuperMotorsModalBtn) {
        openSuperMotorsModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            superMotorsModal.classList.add('active');
        });

        closeSuperMotorsModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            superMotorsModal.classList.remove('active');
        });

        // Close modal when clicking outside of the content card
        superMotorsModal.addEventListener('click', (e) => {
            if (e.target === superMotorsModal) {
                superMotorsModal.classList.remove('active');
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                superMotorsModal.classList.remove('active');
            }
        });
    }

    // Modal Logic for Timeline Explanation
    const timelineModal = document.getElementById('timelineModal');
    const openTimelineModalBtn = document.getElementById('openTimelineModalBtn');
    const closeTimelineModalBtn = document.getElementById('closeTimelineModalBtn');
    const timelineWidget = document.getElementById('timelineWidget');

    if (timelineModal && openTimelineModalBtn && closeTimelineModalBtn) {
        // Allow clicking either the widget or the ? button to open the modal
        const openTimeline = (e) => {
            e.stopPropagation();
            timelineModal.classList.add('active');
        };
        openTimelineModalBtn.addEventListener('click', openTimeline);
        if (timelineWidget) {
            timelineWidget.addEventListener('click', openTimeline);
        }

        closeTimelineModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            timelineModal.classList.remove('active');
        });

        // Close modal when clicking outside of the content card
        timelineModal.addEventListener('click', (e) => {
            if (e.target === timelineModal) {
                timelineModal.classList.remove('active');
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                timelineModal.classList.remove('active');
            }
        });
    }

    // Modal Logic for Parameters Explanation
    const paramsModal = document.getElementById('paramsModal');
    const openParamsModalBtn = document.getElementById('openParamsModalBtn');
    const closeParamsModalBtn = document.getElementById('closeParamsModalBtn');

    if (paramsModal && openParamsModalBtn && closeParamsModalBtn) {
        openParamsModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            paramsModal.classList.add('active');
        });

        closeParamsModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            paramsModal.classList.remove('active');
        });

        // Close modal when clicking outside of the content card
        paramsModal.addEventListener('click', (e) => {
            if (e.target === paramsModal) {
                paramsModal.classList.remove('active');
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                paramsModal.classList.remove('active');
            }
        });
    }

    // Modal Logic for Security Acknowledgement (Confidentiality Warning)
    const securityModal = document.getElementById('securityModal');
    const ackSecurityBtn = document.getElementById('ackSecurityBtn');

    if (securityModal && ackSecurityBtn) {
        ackSecurityBtn.addEventListener('click', () => {
            securityModal.classList.remove('active');
        });
    }
});

