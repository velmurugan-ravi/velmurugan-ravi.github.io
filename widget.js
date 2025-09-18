function initializeClientApp() {
  const hostQueryParamName = 'gcHostOrigin';
  const targetEnvQueryParamName = 'gcTargetEnv';
  const locationSearch = (window && window.location && typeof window.location.search === 'string') ? window.location.search : '';
  const queryParams = new URLSearchParams(locationSearch);

  let clientApp;

  if (queryParams.get(hostQueryParamName) || queryParams.get(targetEnvQueryParamName)) {
    clientApp = new window.purecloud.apps.ClientApp({
      gcHostOriginQueryParam: hostQueryParamName,
      gcTargetEnvQueryParam: targetEnvQueryParamName
    });
  } else {
    clientApp = new window.purecloud.apps.ClientApp(); // fallback
  }

  return clientApp;
}

function waitForPureCloudWidgets(retries = 10) {
  if (window.PURECLOUD && PURECLOUD.WIDGETS) {
    console.log('PURECLOUD SDK loaded. Attaching listener...');

    const clientApp = initializeClientApp();

    PURECLOUD.WIDGETS.on('messageReceived', function (data) {
      const customerMessage = data.message?.text;
      console.log('Customer said:', customerMessage);

      const transcriptBox = document.getElementById('transcript');
      const line = document.createElement('div');
      line.textContent = `Customer: ${customerMessage}`;
      transcriptBox.appendChild(line);

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

  } else if (retries > 0) {
    console.warn('PURECLOUD SDK not ready. Retrying...');
    setTimeout(() => waitForPureCloudWidgets(retries - 1), 500);
  } else {
    console.error('PURECLOUD SDK failed to load after multiple attempts.');
  }
}

window.onload = function () {
  waitForPureCloudWidgets();
};
