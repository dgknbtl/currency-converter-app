<template>
  <div class="conversion-result-wrapper">
    <div class="divider">
      1
      <u>{{getConvertData.currencyFrom}}</u>
      = {{financial(getConvertData.toAmount,5)}}
      <u>{{getConvertData.currencyTo}}</u>
    </div>
    <!-- convert result -->
    <div class="conversion-result">
      <div class="conversion-from">
        {{getConvertData.amount}}
        <span class="currency">{{getConvertData.currencyFrom}}</span>
      </div>
      <span class="equal">=</span>
      <div class="conversion-to">
        {{financial(getConvertData.convertValue,2)}}
        <span
          class="currency"
        >{{getConvertData.currencyTo}}</span>
      </div>
    </div>
    <!-- end / convert result -->
    <div class="divider update-date" title="Last updated">
      <ClockIcon size=".9x"></ClockIcon>
      {{getConvertData.date}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ClockIcon } from "vue-feather-icons";

export default {
  components: {
    ClockIcon
  },
  methods: {
    financial(x, val) {
      return Number.parseFloat(x).toFixed(val);
    }
  },
  computed: {
    ...mapGetters(["getConvertData"])
  }
};
</script>

<style lang="less">
.conversion-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  font-weight: 600;
  &-wrapper {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .equal {
    font-size: 24px;
    color: var(--color-gray);
    line-height: 1.2;
  }
  .currency {
    font-size: 20px;
    font-weight: 400;
  }
  .conversion {
    &-from {
      font-size: 28px;
      color: var(--color-gray);
    }
    &-to {
      font-size: 38px;
      font-weight: 800;
      color: var(--color-primary);
      @supports ((background-clip: text) or (-webkit-background-clip: text)) and
        (
          (text-fill-color: transparent) or
            (-webkit-text-fill-color: transparent)
        ) {
        & {
          background-image: linear-gradient(
            45deg,
            var(--color-secondary),
            var(--color-primary),
            var(--color-secondary),
            var(--color-primary)
          );
          background-size: cover;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          // text-fill-color: transparent;
        }
      }
    }
  }
}
.update-date {
  .feather {
    margin-right: 5px;
  }
}
u {
  margin: 0 5px;
}
.divider {
  width: 100%;
  display: flex;
  align-items: center;
  flex: 0 1 0%;
  color: fade(black, 60);
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.5px;
}
.divider::before,
.divider::after {
  content: "";
  flex-grow: 1;
  border-top: 1px solid fade(black, 12);
}
.divider::before {
  margin-right: 20px;
}
.divider::after {
  margin-left: 20px;
}
</style>