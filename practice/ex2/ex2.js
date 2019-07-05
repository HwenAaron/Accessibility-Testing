document.getElementById("testing").innerHTML = "js works to here 1";

function respondToClick() {
        var textField = document.getElementById('number')
        if (this.textContent === 'Add') {
          textField.value = parseInt(textField.value, 10) + 10;
        } else {
          textField.value = parseInt(textField.value, 10) - 10;
        }
      }
      document.getElementsByTagName('button')[0].onclick = respondToClick;
      document.getElementsByTagName('button')[1].onclick = respondToClick;

document.getElementById("p1").innerHTML = "js works to here 2";

      