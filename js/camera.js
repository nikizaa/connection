class Camera {
    constructor() {
        this.videoelement = document.getElementById('videoelement')
        this.streamContraints = {
            audio: true,
            video: { width: 400, height: 400 },
        }
        this.canvas = document.getElementById('canvaselement')
        this.ctx = this.canvas.getContext('2d', { alpha: false })
        this.canvasInterval = null
        this.fps = 60
        this.window = window
        this.navigator = navigator
        this.info = {
            // text: 'Press the button to take a picture.',
            x: 40,
            y: 60,
        }
        this.margeDuhaut = 100

        this.getVideo()
        this.putIinfo()
        this.detectTouchend()

        console.log(this.videoelement)

        this.canvasInterval = this.window.setInterval(() => {
            this.drawImage(this.videoelement)
        }, 400 / this.fps)
    }
    gotStream(stream) {
        this.videoelement.srcObject = stream
        this.videoelement.play()
    }
    getVideo() {
        if (this.videoelement) {
            this.navigator.mediaDevices
                .getUserMedia(this.streamContraints)
                .then(this.gotStream.bind(this))
                .catch(function (e) {
                    if (
                        confirm(
                            'An error with camera occured:(' + e.name + ') Do you want to reload?'
                        )
                    ) {
                        console.log(e)
                        // location.reload()
                    }
                })
        }
    }

    putIinfo() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '23px Helvetica'
        // this.ctx.fillText(this.info.text, this.info.x, this.info.y)
    }
    drawImage() {
        this.ctx.save()

        this.ctx.translate(0, this.margeDuhaut)
        // this.ctx.fillStyle = red
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.width)
        this.ctx.clip()
        this.ctx.drawImage(
            this.videoelement,
            -(this.streamContraints.video.width /2) / 2,
            -(this.streamContraints.video.height / 2) /2,
            this.streamContraints.video.width * 1.3,
            this.streamContraints.video.height * 1.3
        )
        this.ctx.restore()
    }
    detectTouchend() {
        let touchscrenn = document.getElementById('screnshot')
        touchscrenn.addEventListener('click', (e) => {
            let desiredWidth = this.canvas.width
            let result = null
            let imageContentRaw = this.canvas
                .getContext('2d')
                .getImageData(0, this.margeDuhaut, desiredWidth, desiredWidth)
            let canvas = document.createElement('canvas')
            // with the correct size
            canvas.width = desiredWidth
            canvas.height = desiredWidth
            // put there raw image data
            // expected to be faster as tere are no scaling, etc
            canvas.getContext('2d').putImageData(imageContentRaw, 0, 0)
            // get image data (encoded as bas64)
            result = canvas.toDataURL('image/png', 1.0)
            
            // display image on the left part of the canvas
            let image = new Image()
            image.src = result
            image.onload = () => {
                this.ctx.drawImage(image, this.canvas.height/20, this.canvas.height-(this.canvas.height/5), desiredWidth/5, desiredWidth/5)
            }
        })


    }
    saveImage(){
        // pas Fini

        const img = document.createElement('img')
            img.width = '400'
            img.height = '400'
            img.src = result

            const link = document.createElement('a')
            link.download = 'bluerocket.png'
            link.href = result
            link.innerHTML = 'Download als PNG'
            document.getElementById('screnshot').appendChild(link)
    }
}

window.onload = () => {
   new Camera();
}
