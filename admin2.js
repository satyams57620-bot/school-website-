// LOGIN

async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        document.getElementById("loginMessage").innerHTML =
            "Login Failed: " + error.message;
        return;
    }

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").classList.remove("hidden");

    loadNews();
    loadGallery();
}

// LOGOUT

async function logout() {

    await supabaseClient.auth.signOut();

    location.reload();
}

// ADD NEWS

async function addNews() {

    const title = document.getElementById("newsTitle").value;
    const content = document.getElementById("newsContent").value;

    if (!title || !content) {
        alert("Please enter title and content");
        return;
    }

    const { error } = await supabaseClient
        .from("news")
        .insert([
            {
                title: title,
                content: content
            }
        ]);

    if (error) {
        alert(error.message);
        return;
    }

    document.getElementById("newsTitle").value = "";
    document.getElementById("newsContent").value = "";

    loadNews();
}

// LOAD NEWS

async function loadNews() {

    const { data, error } = await supabaseClient
        .from("news")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.log(error);
        return;
    }

    let html = "";

    data.forEach(item => {

        html += `
        <div class="item">
            <h3>${item.title}</h3>
            <p>${item.content}</p>

            <button class="delete-btn"
                onclick="deleteNews(${item.id})">
                Delete
            </button>
        </div>
        `;
    });

    document.getElementById("newsList").innerHTML = html;
}

// DELETE NEWS

async function deleteNews(id) {

    await supabaseClient
        .from("news")
        .delete()
        .eq("id", id);

    loadNews();
}

// ADD GALLERY IMAGE

async function addGalleryImage() {

    const image_url =
        document.getElementById("imageUrl").value;

    if (!image_url) {
        alert("Enter image URL");
        return;
    }

    await supabaseClient
        .from("gallery")
        .insert([
            {
                image_url: image_url
            }
        ]);

    document.getElementById("imageUrl").value = "";

    loadGallery();
}

// LOAD GALLERY

async function loadGallery() {

    const { data, error } = await supabaseClient
        .from("gallery")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.log(error);
        return;
    }

    let html = "";

    data.forEach(item => {

        html += `
        <div class="item">

            <img
                src="${item.image_url}"
                width="150">

            <br><br>

            <button
                class="delete-btn"
                onclick="deleteGallery(${item.id})">
                Delete
            </button>

        </div>
        `;
    });

    document.getElementById("galleryList").innerHTML = html;
}

// DELETE GALLERY IMAGE

async function deleteGallery(id) {

    await supabaseClient
        .from("gallery")
        .delete()
        .eq("id", id);

    loadGallery();
}

// UPDATE SCHOOL INFO

async function updateSchoolInfo() {

    const phone =
        document.getElementById("schoolPhone").value;

    const email =
        document.getElementById("schoolEmail").value;

    const map_link =
        document.getElementById("schoolMap").value;

    const { error } = await supabaseClient
        .from("school_info")
        .upsert([
            {
                id: 1,
                phone: phone,
                email: email,
                map_link: map_link
            }
        ]);

    if (error) {
        alert(error.message);
        return;
    }

    alert("School Information Updated Successfully");
}
