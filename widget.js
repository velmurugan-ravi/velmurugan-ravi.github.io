window.onload = function () {
  if (window.PURECLOUD && PURECLOUD.WIDGETS) {
    PURECLOUD.WIDGETS.on('messageReceived', function (data) {
      const customerMessage = data.message?.text;
      console.log('Customer said:', customerMessage);

      // Display message in transcript
      const transcriptBox = document.getElementById('transcript');
      const line = document.createElement('div');
      line.textContent = `Customer: ${customerMessage}`;
      transcriptBox.appendChild(line);

      // Mock suggestions
      const suggestions = [
        `Thanks for reaching out!`,
        `I understand your concern.`,
        `Let me check that for you.`
      ];

      const container = document.getElementById('suggestions');
      container.innerHTML = '';
      suggestions.forEach(text => {
        const div = document.createElement('div');
        div.className = 'suggestion';
        div.textContent = text;
        container.appendChild(div);
      });
    });
  } else {
    console.error('PURECLOUD SDK not loaded.');
  }
};
