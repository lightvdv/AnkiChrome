chrome.storage.onChanged.addListener(function(changes) {


    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
        'action': 'addNote',
        'version': 6,
        'params': {
            'note': {
                'deckName': 'MyDeck',
                'modelName': 'Basic',
                'fields': {
                    'Front': changes.engVersion.newValue,
                    'Back': changes.rusVersion.newValue,
                },
                'options': {
                    'allowDuplicate': false,
                    'duplicateScope': 'deck',
                    'duplicateScopeOptions': {
                        'deckName': 'Default',
                        'checkChildren': false,
                    },
                },
            },
        },
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch('http://127.0.0.1:8765', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


    chrome.storage.local.clear(function() {
        let error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
    chrome.storage.sync.clear();

});

