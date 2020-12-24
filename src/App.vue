<template>
  <div id="app" class="app">
    <transition mode="out-in" name="fade" appear>
      <div class="app-card">
        <ConverterForm />
        <ConverterResult />
        <CurrencyChart />
      </div>
    </transition>

    <!-- footer text -->
    <div class="footer-text">
      <a href="https://github.com/Incognito95/currency-converter-app" target="_blank" class="link">
        <GithubIcon size="1x"></GithubIcon>
        <span>Github Repository</span>
      </a> 
    </div>
    <!--- footer text -->
  </div>
</template>

<script>
import ConverterForm from "@/components/ConverterForm";
import ConverterResult from "@/components/ConverterResult";
import CurrencyChart from "@/components/Chart/CurrencyChart";
import { mapActions } from "vuex";

import { GithubIcon } from "vue-feather-icons";

export default {
  name: "App",
  components: {
    ConverterForm,
    ConverterResult,
    CurrencyChart,
    GithubIcon
  },
  methods: {
    ...mapActions(["fetchCurrencyUnits"]),
    initData() {
      this.fetchCurrencyUnits();
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --color-primary:#4862D2;
  --color-secondary: #4862D2;
  --color-gray: black;
  --font-family: "Jost";
  --app-card-width: 370px;
}
input,
button,
select {
  outline: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

html,
body {
  font-family: var(--font-family);
  font-size: 16px;
  background-image: linear-gradient(
    -90deg,
    var(--color-primary),
    var(--color-secondary)
  );
}

.app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.app-card {
  width: var(--app-card-width);
  min-height: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 20px 20px fade(black, 30);
}

.btn {
  &-currency-invert {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    border: 0;
    margin: 0 20px;
    flex-shrink: 0;
    background-color: var(--color-primary);
    background-image: linear-gradient(
      45deg,
      var(--color-primary),
      var(--color-secondary)
    );
    color: #fff;
    font-size: 18px;
    transition: all 200ms ease-out;
    &:hover {
      cursor: pointer;
      background-image: none;
      background-image: linear-gradient(
        -45deg,
        var(--color-primary),
        var(--color-secondary)
      );
      font-size: 22px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

@media (max-width: 480px) {
  .app {
    height: auto;
    &-card {
      width: 100%;
      border-radius: 0;
    }
  }
}

@media (max-height: 800px) {
  .app {
    height: auto;
    &-card {
      margin: 30px 0;
    }
  }
}

.footer-text {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .link,
  .link-fade {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: fade(#fff, 90);
    font-weight: 400;
    text-shadow: 0 2px 3px fade(black, 20);
    margin: 0 10px;
    span {
      font-size: 18px;
      margin-left: 5px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
