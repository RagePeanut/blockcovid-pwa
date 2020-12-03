<template>
    <div class="qr-reader__container" ref="container">
        <video class="source qr-reader__camera"
               ref="video"
               :width="videoWH.width"
               :height="videoWH.height"
               controls>
        </video>
        <canvas ref="trackingLayer" class="qr-reader__overlay"
                :width="videoWH.width"
                :height="videoWH.height"></canvas>
    </div>
</template>

<script>
import jsQR from "jsqr";
// import { getVideoImageData } from "../utils/image-data";

export default {
  name: "QrReader",
  props: {
    useBackCamera: {
      type: Boolean,
      default: true
    },
    stopOnScanned: {
      type: Boolean,
      default: true
    },
    drawOnFound: {
      type: Boolean,
      default: true
    },
    lineColor: {
      type: String,
      default: "#FF3B58"
    },
    lineWidth: {
      type: Number,
      default: 2
    },
    videoWidth: {
      type: Number,
      default: 320
    },
    videoHeight: {
      type: Number,
      default: 240
    },
    responsive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPlay: false,
      containerWidth: null,
      active: false
    };
  },
  computed: {
    videoWH() {
      if (this.containerWidth) {
        const width = this.containerWidth;
        const height = width * 0.75;
        return { width, height };
      }
      return { width: this.videoWidth, height: this.videoHeight };
    }
  },
  methods: {
    drawLine(begin, end) {
      this.trackingLayer.beginPath();
      this.trackingLayer.moveTo(begin.x, begin.y);
      this.trackingLayer.lineTo(end.x, end.y);
      this.trackingLayer.lineWidth = this.lineWidth;
      this.trackingLayer.strokeStyle = this.lineColor;
      this.trackingLayer.stroke();
    },
    async drawBox(l) {
        if (this.drawOnFound) {
            this.clearTrackingLayer();
            const location = this.adjustLocation(l);
            this.drawLine(location.topLeftCorner, location.topRightCorner);
            this.drawLine(location.topRightCorner, location.bottomRightCorner);
            this.drawLine(location.bottomRightCorner, location.bottomLeftCorner);
            this.drawLine(location.bottomLeftCorner, location.topLeftCorner);
        }
    },
    delay() {
        return new Promise(resolve => {
            window.setTimeout(resolve, 50);
        });
    },
    clearTrackingLayer() {
        const canvas = this.$refs.trackingLayer;
        this.trackingLayer.clearRect(0, 0, canvas.width, canvas.height);
    },
    adjustLocation(location) {
        const video = this.$refs.video;
        // The visually occupied area of the video element.
        // Because the component is responsive and fills the available space,
        // this can be more or less than the actual resolution of the camera.
        const displayWidth = video.offsetWidth;
        const displayHeight = video.offsetHeight;
        // The actual resolution of the camera.
        // These values are fixed no matter the screen size.
        const resolutionWidth = video.videoWidth;
        const resolutionHeight = video.videoHeight;
        // Dimensions of the video element as if there would be no
        //   object-fit: cover;
        // Thus, the ratio is the same as the cameras resolution but it's
        // scaled down to the size of the visually occupied area.
        const largerRatio = Math.max(
            displayWidth / resolutionWidth,
            displayHeight / resolutionHeight
        );
        const uncutWidth = resolutionWidth * largerRatio;
        const uncutHeight = resolutionHeight * largerRatio;
        const xScalar = uncutWidth / resolutionWidth;
        const yScalar = uncutHeight / resolutionHeight;
        const xOffset = (displayWidth - uncutWidth) / 2;
        const yOffset = (displayHeight - uncutHeight) / 2;
        const coordinatesAdjusted = {};
        for (const key in location) {
            coordinatesAdjusted[key] = {
                x: Math.floor(location[key].x * xScalar + xOffset),
                y: Math.floor(location[key].y * yScalar + yOffset)
            };
        }
        return coordinatesAdjusted;
    },
    setup() {
      if (this.responsive) {
        this.$nextTick(() => {
          this.containerWidth = this.$refs.container.clientWidth;
        });
      }
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.previousCode = null;
        this.parity = 0;
        this.active = true;
        this.trackingLayer = this.$refs.trackingLayer.getContext("2d");
        const facingMode = this.useBackCamera
          ? { exact: "environment" }
          : "user";
        const handleSuccess = stream => {
          if (this.$refs.video.srcObject !== undefined) {
            this.$refs.video.srcObject = stream;
          } else if (this.$refs.video.mozSrcObject !== undefined) {
            this.$refs.video.mozSrcObject = stream;
          } else if (window.URL.createObjectURL) {
            this.$refs.video.src = window.URL.createObjectURL(stream);
          } else if (window.webkitURL) {
            this.$refs.video.src = window.webkitURL.createObjectURL(stream);
          } else {
            this.$refs.video.src = stream;
          }
          // iOS play inline
          this.$refs.video.playsInline = true;
          this.$refs.video.play();
        //   const playPromise = this.$refs.video.play();
        //   playPromise.catch(() => (this.showPlay = true));
        //   playPromise.then(this.run);
        };
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode } })
          .then(handleSuccess)
          .catch(() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(handleSuccess)
              .catch(error => {
                this.$emit("error-captured", error);
              });
          });
        this.$refs.video.addEventListener("canplay", this.scan);
      }
    },
    async scan() {
        // Due to it being asynchronous, the method could have been called after the video has been destroyed
        if(this.$refs.video) {
            requestAnimationFrame(this.draw);
            await this.delay(500);
            this.scan();
        }
    },
    draw() {
        // if(this.$refs.video) {
        //     const imageData = getVideoImageData(this.$refs.video);
        //     let code = false;
        //     try {
        //         code = jsQR(imageData.data, imageData.width, imageData.height);
        //     } catch (e) {
        //         // sometimes JSQR may fail, but we can carry on.
        //         console.error(e);
        //     }
        //     if(code) {
        //         this.drawBox(code.location);
        //         this.found(code.data);
        //     } else {
        //         this.clearTrackingLayer();
        //     }
        // }
    },
    found(code) {
      if (this.previousCode !== code) {
        this.previousCode = code;
      } else if (this.previousCode === code) {
        this.parity += 1;
      }
      if (this.parity > 2) {
        this.active = this.stopOnScanned ? false : true;
        this.parity = 0;
        this.$emit("code-scanned", code);
      }
    },
    fullStop() {
      if (this.$refs.video && this.$refs.video.srcObject) {
        this.$refs.video.srcObject.getTracks().forEach(t => t.stop());
      }
    }
  },
  mounted() {
    this.setup();
  },
  beforeDestroy() {
    this.fullStop();
  },
  watch: {
    active: {
      immediate: true,
      handler(active) {
        if (!active) {
          this.fullStop();
        }
      }
    }
  }
};
</script>

<style scoped>
.qr-reader__container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
}
.qr-reader__camera {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}
.qr-reader__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>