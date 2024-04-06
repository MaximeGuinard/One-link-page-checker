document.addEventListener('DOMContentLoaded', function() {
    var checkLinksBtn = document.getElementById('checkLinksBtn');
    checkLinksBtn.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: {tabId: tabId},
          files: ['content.js']
        }, function() {
          chrome.tabs.sendMessage(tabId, {action: 'checkLinks'}, function(response) {
            if (response && response.links) {
              generateTable(response.links);
            }
          });
        });
      });
    });
  
    var copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', function() {
      copyLinks();
    });
  });
  
  function generateTable(links) {
    var tbody = document.querySelector('#linkTable tbody');
    tbody.innerHTML = '';
  
    links.forEach(function(link) {
      var row = document.createElement('tr');
  
      var linkCell = document.createElement('td');
      linkCell.textContent = link.url;
      row.appendChild(linkCell);
  
      tbody.appendChild(row);
    });
  }
  
  function copyLinks() {
    var linkElements = document.querySelectorAll('#linkTable tbody td:first-child');
    var links = Array.from(linkElements).map(function(linkElement) {
      return linkElement.textContent;
    });
  
    var textarea = document.createElement('textarea');
    textarea.value = links.join('\n');
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  
    alert('Les liens ont été copiés dans le presse-papiers.');
  }