<template>
  <!-- app form -->
  <div class="app-form">
    <!-- amount -->
    <div class="amount">
      <label class="form-label">Amount</label>
      <div class="form-group">
        <input
          type="number"
          class="form-control"
          min="0"
          v-model="amount"
          @keyup="convertCurrency"
          step="20"
        />
      </div>
    </div>
    <!-- end / amount-->
    <!-- currency group -->
    <div class="currency-group">
      <!-- form group -->
      <div class="form-group">
        <label class="form-label">From</label>
        <vSelect
          :options="getCurrencyUnits"
          v-model="currencyFrom"
          :value="getCurrencyUnits"
          @input="convertCurrency()"
          :searchable="false"
        >
          <template v-slot:option="val">
            {{ val.label }}
          </template>
        </vSelect>
      </div>
      <!-- end / form group -->
      <button class="btn-currency-invert" @click="swapCurrency">
        <i class="fas fa-exchange-alt"></i>
      </button>
      <!-- form group -->
      <div class="form-group">
        <label class="form-label">To</label>
        <vSelect
          :options="getCurrencyUnits"
          v-model="currencyTo"
          :value="getCurrencyUnits"
          @input="convertCurrency()"
          :searchable="false"
        >
          <template v-slot:option="val">

            {{ val.label }}
          </template>
        </vSelect>
      </div>
      <!-- end / form group -->
    </div>
    <!-- end / currency group -->
  </div>
  <!-- end / app form -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      currencyFrom: "USD",
      currencyTo: "GBP",
      amount: 100,
      publicPath: process.env.BASE_URL,
      countryFlags: []
    };
  },
  methods: {
    ...mapActions(["fetchConvertCurrency", "swapCurrency"]),
    convertCurrency() {
      this.fetchConvertCurrency({
        currencyFrom: this.currencyFrom,
        currencyTo: this.currencyTo,
        amount: this.amount
      });
    },
    swapCurrency() {
      const temp = this.currencyFrom;
      this.currencyFrom = this.currencyTo;
      this.currencyTo = temp;
      this.convertCurrency();
    },
  },
  watch: {
    getCurrencyUnits() {
      this.countryFlag();
    }
  },
  computed: {
    ...mapGetters(["getCurrencyUnits"])
  },
  mounted() {
    this.convertCurrency();
    this.countryFlag();
  }
};
</script>

<style lang="less">
// app form
.app-form {
  .form-control,
  .v-select {
    width: 100% !important;
    height: 48px;
    border: 2px solid #e8e8e8;
    border-radius: 100px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 18px;
    font-weight: 600;
    transition: all 350ms;
    &:focus {
      border: 2px solid var(--color-primary);
      color: var(--color-primary);
    }
  }
  .form-control + .form-control {
    margin-left: 20px;
  }
  .form-label {
    display: block;
    font-size: 18px;
    color: var(--color-gray);
    margin-bottom: 5px;
  }

  .currency-group {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .form-control {
      width: 105px;
    }
  }
  .amount {
    margin-bottom: 20px;
    .form-control {
      font-size: 20px;
      letter-spacing: 1px;
    }
  }
}

.countryFlag {
  margin-right: 10px;
}

.v-select {
  display: flex;
  width: auto;
  min-width: 1em;
  padding-left: 10px !important;
  padding-right: 10px !important;
  width: 100%;
}
.vs__selected {
  padding: 0;
  min-width: 60px;
}
.vs__dropdown-toggle {
  border: 0;
}
.vs__selected-options {
  flex-wrap: nowrap;
}
.vs--single.vs--open .vs__selected {
  position: relative;
  opacity: 1;
  color: var(--color-primary) !important;
}
.vs__clear {
  display: none;
}
.vs__actions {
  display: flex;
  align-items: center;
  padding: 0;
  padding-right: 5px;
  padding-top: 5px;
}
.vs__search {
  // display: none;
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
}
.vs__dropdown-option {
  display: flex;
  align-items: center;
  padding: 6px 20px;
}
.vs--open {
  border-color: var(--color-primary) !important;
}
</style>