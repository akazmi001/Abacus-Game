const abacusContainer = document.getElementById('abacus');
    const targetEl = document.getElementById('target-number');
    const currentValueEl = document.getElementById('current-value');
    const statusEl = document.getElementById('status');

    const labels = ['T-Th', 'Th', 'H', 'T', 'O'];
    const colors = ['bg-green-400', 'bg-pink-400', 'bg-blue-500', 'bg-yellow-400', 'bg-orange-500'];
    let beads = [0, 0, 0, 0, 0];
    let target = 0;

    function renderAbacus() {
      abacusContainer.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const rod = document.createElement('div');
        rod.className = 'flex flex-col items-center ';

        // Vertical rod stick
        const rodStick = document.createElement('div');
        rodStick.className = 'w-1 bg-orange-800 flex flex-col-reverse items-center justify-start gap-0 translate-y-3';
        rodStick.style.height = '144px'; 

                for (let j = 0; j < beads[i]; j++) {
                const bead = document.createElement('div');
                bead.className = `w-6 h-4 rounded-full ${colors[i]} mb-0.35`;
                rodStick.appendChild(bead);
                }


        // Label
        const label = document.createElement('div');
        label.innerText = labels[i];
        label.className = 'mt-3 text-sm font-bold text-white';

        // Buttons
        const controls = document.createElement('div');
        controls.className = 'flex gap-1 mt-2';

        const plus = document.createElement('button');
        plus.innerText = '+';
        plus.className = 'bg-blue-400 text-white px-2 py-1 rounded';
        plus.onclick = () => addBead(i);

        const minus = document.createElement('button');
        minus.innerText = '-';
        minus.className = 'bg-blue-400 text-white px-2 py-1 rounded';
        minus.onclick = () => removeBead(i);

        controls.append(minus, plus);

        rod.append(rodStick, label, controls);
        abacusContainer.appendChild(rod);
      }
    }

    function addBead(index) {
      beads[index]++;
      if (beads[index] > 9) {
        beads[index] = 0;
        if (index > 0) addBead(index - 1);
      }
      update();
    }

    function removeBead(index) {
      if (beads[index] > 0) {
        beads[index]--;
        update();
      }
    }

    function calculateValue() {
      return beads.reduce((acc, val, idx) => acc + val * Math.pow(10, 4 - idx), 0);
    }

    function update() {
      renderAbacus();
      const current = calculateValue();
      currentValueEl.innerText = `${current}`;
      if (current === target) {
        statusEl.innerText = 'You matched the number!';
        statusEl.className = 'text-green-600 font-semibold';
      } else {
        statusEl.innerText = 'Keep adjusting the beads.';
        statusEl.className = 'text-black-600 font-semibold';
      }
    }

    function generateNewTarget() {
      target = Math.floor(Math.random() * 100000);
      targetEl.innerText = String(target).padStart(5, '0');
      beads = [0, 0, 0, 0, 0];
      update();
    }

    generateNewTarget();