

const App = {

    $: {
        imageContainer: document.querySelector("#image-container"),
        nextBtn: document.querySelector("#next-btn"),

        URL: 'https://api.giphy.com/v1/gifs/translate?api_key=x6vZl3I4GCG4RX7WL9bXTlW17rH8tM86&s=cats&weirdness=4' 
    },


    init(){
        this.fetchImg();
        this.applyListeners()
    },

    applyListeners(){
        this.$.nextBtn.addEventListener("click", () => this.fetchImg())
    },

    updateImg(src){
        if(this.$.imageContainer.querySelector("img")){
            const pastImg = this.$.imageContainer.querySelector("img");
            pastImg.remove();
        }
        const img = document.createElement("img");
        img.src = src;
        img.alt = "cat gif";

        this.$.imageContainer.appendChild(img);
    },


    async fetchImg(){
        try{
            const response = await fetch(this.$.URL);
            const dataObject = await response.json();
            const img = dataObject.data.images["fixed_height"].url
            this.updateImg(img)
        }
        catch(error){
            console.error("AHHHHHH! ", error)
        }
    }
}

App.init()