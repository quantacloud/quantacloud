/* profile.js */

window.onload = function() {

    // Get txt from user's language json (language.js)
    getJSON();
}

var changeLogin = function() {
    var login = document.querySelector("#login").value;

    var returnArea = document.querySelector("#changeLoginReturn");
    returnArea.innerHTML = "<img src='./public/pictures/index/loader.gif' style='height: 3vh;' />";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "Profile/ChangeLogin", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function()
    {
        if(xhr.status == 200 && xhr.readyState == 4)
        {
            console.log(xhr.responseText);
            if(xhr.responseText.length > 2)
            {
                // success message
                if(xhr.responseText.substr(0, 3) == "ok@") {
                    window.location.href="Profile";
                    return false;
                }
                else {
                    // error
                    returnArea.innerHTML = xhr.responseText;
                }
            }
        }
    }
    xhr.send("login="+encodeURIComponent(login));
}

var changePassword = function() {
    var returnArea = document.querySelector("#changePasswordReturn");
    returnArea.innerHTML = "<img src='./public/pictures/index/loader.gif' style='height: 3vh;' />";

    var old_pwd = document.querySelector("#oldpwd").value;
    var new_pwd = document.querySelector("#newpwd").value;
    var pwd_confirm = document.querySelector("#pwdconfirm").value;

    if(new_pwd.length < 6 || pwd_confirm !== new_pwd)
        returnArea.innerHTML = txt.Register.form;
    else {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "Profile/ChangePassword", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function()
        {
            if(xhr.status == 200 && xhr.readyState == 4)
            {
                console.log(xhr.responseText);
                if(xhr.responseText.length > 2)
                {
                    // success message
                    if(xhr.responseText.substr(0, 3) == "ok@") {
                        window.location.href="Profile";
                        return false;
                    }
                    else {
                        // error
                        returnArea.innerHTML = xhr.responseText;
                    }
                }
            }
        }
        xhr.send("old_pwd="+sha512(old_pwd)+"&new_pwd="+sha512(new_pwd)+"&pwd_confirm="+sha512(pwd_confirm));
    }
}

var changePassPhrase = function() {
    var returnArea = document.querySelector("#changePassPhraseReturn");
    returnArea.innerHTML = "<img src='./public/pictures/index/loader.gif' style='height: 3vh;' />";

    var old_pp = document.querySelector("#oldpp").value;
    var new_pp = document.querySelector("#newpp").value;
    var pp_confirm = document.querySelector("#ppconfirm").value;
	var current_pp = sessionStorage.getItem("kek");

	var cek = sessionStorage.getItem("cek"); ///we get the CEK from sessionStorage
	if (cek == null || current_pp == null) {
		window.location.href = "Logout";
	}else {
		var cek = sjcl.codec.hex.toBits(cek); //we decode it because the CEK is hexa' encoded in sessionStorage to avoid any compatibility problem
	}

	if (old_pp != current_pp) {
		returnArea.innerHTML = "<p>You typed the wrong passphrase!</p>";
		}else if (new_pp.length < 6) {
			returnArea.innerHTML = txt.Register.form;
		}else{


					//crypto parameters, don't touch
					var aDATA = sjcl.random.randomWords(4);
					var initVector = sjcl.random.randomWords(4);
					var salt = sjcl.random.randomWords(2);

					//we encrypt the CEK under the new passphrase (alias "KEK" -Key Encryption Key)
					var encryptedCek = sjcl.encrypt(new_pp, cek, {mode:'gcm', iter:2000, iv:initVector, ks:256, adata:aDATA, ts:128, salt:salt});
					var encryptedCek = base64.encode(encryptedCek); //we b64encode it to store it in the DB

			        var xhr = new XMLHttpRequest();
			        xhr.open("POST", "Profile/ChangePassPhrase", true);
			        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			        xhr.onreadystatechange = function()
			        {
			            if(xhr.status == 200 && xhr.readyState == 4)
			            {
			                console.log(xhr.responseText);
			                if(xhr.responseText.length > 2)
			                {
			                    // success message
			                    if(xhr.responseText.substr(0, 3) == "ok@") {
									sessionStorage.setItem("kek", new_pp);
			                        window.location.href="Profile";
			                        return false;
			                    }
			                    else {
			                        // error
			                        returnArea.innerHTML = xhr.responseText;
			                    }
			                }
			            }
			        }
			        xhr.send(encodeURIComponent(encryptedCek)); //we send the b64encoded&encrypted CEK

		}
	}

var changeAuth = function() {
    var returnArea = document.querySelector("#changeAuthReturn");
    var doubleAuth = document.querySelector("#doubleAuth").checked;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "Profile/changeAuth", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function()
    {
        if(xhr.status == 200 && xhr.readyState == 4) {
            console.log(xhr.responseText);
            returnArea.innerHTML = xhr.responseText;
        }
    }
    xhr.send("doubleAuth="+doubleAuth);
}
//change user email

var changeMail = function() {
    var changemail = document.querySelector("#changemail").value;

    var returnArea = document.querySelector("#changeMailReturn");
    returnArea.innerHTML = "<img src='./public/pictures/index/loader.gif' style='height: 3vh;' />";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "Profile/ChangeMail", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function()
    {
      if(xhr.status == 200 && xhr.readyState == 4)
        {
            console.log(xhr.responseText);
            if(xhr.responseText.length > 2)
            {
                // success message
                if(xhr.responseText.substr(0, 3) == "ok@") {
                    window.location.href="Profile";
                    return false;
                }
                else {
                    // error
                    returnArea.innerHTML = xhr.responseText;
                }
            }
        }
    }
    xhr.send("changemail="+encodeURIComponent(changemail));
}

//delete button

var deleteUser = function() {
    var returnArea = document.querySelector("#deleteUserReturn");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "Profile/DeleteUser", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function()
    {
      if(xhr.status == 200 && xhr.readyState == 4) {
			if(xhr.responseText.substr(0, 3) == "ok@") {
				window.location.href="Logout";
				return false;
			}
			else {
				// error
            	returnArea.innerHTML = xhr.responseText;
			}
        }
    }
    xhr.send("deleteUser=ok");
}


function ConfirmDelete() {
	if (confirm(txt.Profile.accountDeletionConfirm)) {
		deleteUser();
	}
}
