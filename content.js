chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'checkLinks') {
    var links = Array.from(document.getElementsByTagName('a'));
    var linkData = [];

    links.forEach(function(link) {
      var url = link.href;
      var status = 200; // Par défaut, considérez le lien comme valide

      // Effectuez ici la vérification du statut du lien (par exemple, en utilisant une requête AJAX)

      // Exemple de vérification de statut simplifié
      if (url.includes('404')) {
        status = 404;
      }

      linkData.push({ url: url, status: status });
    });

    sendResponse({ links: linkData });
  }
});