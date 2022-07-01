const vscode = require('vscode');

function activate(context) {
	let disposable = vscode.commands.registerCommand('test.helloWorld', function () {
        panel.webview.postMessage({
            code:`<?xml version="1.0"?>
<catalog>
    <book id="bk101">
        <author>Gambardella, Matthew</author>
        <title>XML Developer's Guide</title>
        <genre>Computer</genre>
        <price>44.95</price>
        <publish_date>2000-10-01</publish_date>
        <description>An in-depth look at creating applications 
        with XML.</description>
    </book>
    <book id="bk102">
        <author>Ralls, Kim</author>
        <title>Midnight Rain</title>
        <genre>Fantasy</genre>
        <price>5.95</price>
        <publish_date>2000-12-16</publish_date>
        <description>A former architect battles corporate zombies, 
        an evil sorceress, and her own childhood to become queen 
        of the world.</description>
    </book>
    <book id="bk103">
        <author>Corets, Eva</author>
        <title>Maeve Ascendant</title>
        <genre>Fantasy</genre>
        <price>5.95</price>
        <publish_date>2000-11-17</publish_date>
        <description>After the collapse of a nanotechnology 
        society in England, the young survivors lay the 
        foundation for a new society.</description>
    </book>
    <book id="bk104">
        <author>Corets, Eva</author>
        <title>Oberon's Legacy</title>
        <genre>Fantasy</genre>
        <price>5.95</price>
        <publish_date>2001-03-10</publish_date>
        <description>In post-apocalypse England, the mysterious 
        agent known only as Oberon helps to create a new life 
        for the inhabitants of London. Sequel to Maeve 
        Ascendant.</description>
    </book>
    <book id="bk105">
        <author>Corets, Eva</author>
        <title>The Sundered Grail</title>
        <genre>Fantasy</genre>
        <price>5.95</price>
        <publish_date>2001-09-10</publish_date>
        <description>The two daughters of Maeve, half-sisters, 
        battle one another for control of England. Sequel to 
        Oberon's Legacy.</description>
    </book>
    <book id="bk106">
        <author>Randall, Cynthia</author>
        <title>Lover Birds</title>
        <genre>Romance</genre>
        <price>4.95</price>
        <publish_date>2000-09-02</publish_date>
        <description>When Carla meets Paul at an ornithology 
        conference, tempers fly as feathers get ruffled.</description>
    </book>
    <book id="bk107">
        <author>Thurman, Paula</author>
        <title>Splish Splash</title>
        <genre>Romance</genre>
        <price>4.95</price>
        <publish_date>2000-11-02</publish_date>
        <description>A deep sea diver finds true love twenty 
        thousand leagues beneath the sea.</description>
    </book>
    <book id="bk108">
        <author>Knorr, Stefan</author>
        <title>Creepy Crawlies</title>
        <genre>Horror</genre>
        <price>4.95</price>
        <publish_date>2000-12-06</publish_date>
        <description>An anthology of horror stories about roaches,
        centipedes, scorpions  and other insects.</description>
    </book>
    <book id="bk109">
        <author>Kress, Peter</author>
        <title>Paradox Lost</title>
        <genre>Science Fiction</genre>
        <price>6.95</price>
        <publish_date>2000-11-02</publish_date>
        <description>After an inadvertant trip through a Heisenberg
        Uncertainty Device, James Salway discovers the problems 
        of being quantum.</description>
    </book>
    <book id="bk110">
        <author>O'Brien, Tim</author>
        <title>Microsoft .NET: The Programming Bible</title>
        <genre>Computer</genre>
        <price>36.95</price>
        <publish_date>2000-12-09</publish_date>
        <description>Microsoft's .NET initiative is explored in 
        detail in this deep programmer's reference.</description>
    </book>
    <book id="bk111">
        <author>O'Brien, Tim</author>
        <title>MSXML3: A Comprehensive Guide</title>
        <genre>Computer</genre>
        <price>36.95</price>
        <publish_date>2000-12-01</publish_date>
        <description>The Microsoft MSXML3 parser is covered in 
        detail, with attention to XML DOM interfaces, XSLT processing, 
        SAX and more.</description>
    </book>
    <book id="bk112">
        <author>Galos, Mike</author>
        <title>Visual Studio 7: A Comprehensive Guide</title>
        <genre>Computer</genre>
        <price>49.95</price>
        <publish_date>2001-04-16</publish_date>
        <description>Microsoft Visual Studio 7 is explored in depth,
        looking at how Visual Basic, Visual C++, C#, and ASP+ are 
        integrated into a comprehensive development 
        environment.</description>
    </book>
</catalog>
            `,
            theme:'dark'
        });
    });

	const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
			// Enable scripts in the webview
			enableScripts: true
		}
      );

	// And set its HTML content
	panel.webview.html = getWebviewContent();

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

function getWebviewContent() {
	return `
    <html>

<head>
    <title>XML thingy</title>
    <style>
        table {
            font-family: 'Cascadia Code',Consolas, 'Courier New', monospace;
            font-size: 12px;
        }

        td {
            padding-left: 5px;
            padding-right: 40px;
        }

        td:first-child {
            padding-left: 10px;
            padding-right: 20px;
            text-align: right;
        }
        
        div {
            display: inline;
            white-space: pre;
        }
    </style>
    <script>
        var dark = {
            background:"#1e1e1e",
            line_number:"#9c9c9c",
            tag:"#569cd6",
            text:"whitesmoke",
            value:"#ce9178"
        };

        var light = {
            background:"#ffffff",
            line_number:"#000000",
            tag:"#800000",
            text:"#000000",
            value:"#0000ff"
        };


        window.addEventListener('message', event => {
            const message = event.data; // The JSON data our extension sent
            createEditor(document.getElementById("editor"), message.code,message.theme);
        });

        function createEditor(container, code, mode) {
            let colors = {};
            if(mode=="dark"){
                colors=dark;
            }else{
                colors=light;
            }

            console.log(colors);

            let editor = document.createElement("table");
            editor.style.backgroundColor=colors["background"];

            let lines = code.split(/\\r?\\n/);
            for (let i = 0; i < lines.length; i++) {
                new_row = editor.insertRow(i);
                line_number = new_row.insertCell(0);
                line_code = new_row.insertCell(1);

                //Split by tag beginning and end
                let split_by_tag = lines[i].split(/(\\<(?<=\\<)[^\\>]*\\>)/g);

                for (let j = 0; j < split_by_tag.length; j++) {
                    let text = document.createElement("div");

                    if (split_by_tag[j][0] == "<") {
                        //Check for attributes
                        let split_by_quotes = split_by_tag[j].split(/([""])/);
                        let isValue = false;
                        for (let k = 0; k < split_by_quotes.length; k++) {
                            let tag_text = document.createElement("div");
                            if (split_by_quotes[k] == "\\"") {
                                isValue = !isValue;
                                tag_text.style.color = colors["value"];
                            } else {
                                isValue ? tag_text.style.color = colors["value"] : tag_text.style.color = colors["tag"];
                            }

                            tag_text.innerText = split_by_quotes[k];
                            text.append(tag_text);
                        }
                    } else {
                        text.style.color = colors["text"];
                        text.innerText = split_by_tag[j];
                    }

                    line_code.append(text);
                }

                line_number.style.color = colors["line_number"];
                line_number.innerHTML = i+1;
            }

            container.innerHTML = "";
            container.append(editor);
        }

        function run() {
            let enableDark=document.getElementById("dark").checked;
            console.log(enableDark?"dark":"light");
            createEditor(document.getElementById("editor"), document.getElementById("input").value,enableDark?"dark":"light");
        }
    </script>
</head>

<body>
    <div id="editor"></div>
</body>

</html>
    `;
  }