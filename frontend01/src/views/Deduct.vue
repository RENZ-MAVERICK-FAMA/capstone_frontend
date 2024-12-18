<template>
  <main class="p-5 flex justify-center bg-slate-100">
    <div class="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-5">
      <div class="bg-white p-5 rounded-[10px] w-full md:w-[450px]">
      <form @submit.prevent="deduct" class="mt-3">
        <h1 class="text-[20px] font-bold">Pay Delinquency</h1>

        <!-- Error Message -->
        <div
          v-if="error"
          class="text-red-500 mt-3 relative bg-red-100 p-5 text-center rounded-[10px] text-[14px] font-light"
          role="alert"
        >
          <i
            @click="clearError"
            class="pi pi-times-circle text-red-500 text-[18px] absolute top-1 right-1 cursor-pointer"
          ></i>
          {{ error }}
        </div>

        <!-- Success Message -->
        <div
          v-if="success"
          class="text-green-500 mt-3 relative bg-green-100 p-5 text-center rounded-[10px] text-[14px] font-light"
          role="alert"
        >
          <i
            @click="clearSuccess"
            class="pi pi-times-circle text-green-500 text-[18px] absolute top-1 right-1 cursor-pointer"
          ></i>
          {{ success }}
        </div>

        <!-- Select Unit -->
        <div class="mt-3 grid">
          <label for="unit">Body Number</label>
          <Select
            class="w-full"
            v-model="selectedUnit"
            :options="units"
            optionLabel="unit_info"
            placeholder="Select Unit"
            @change="fetchUnitDelinquencies"
          />
        </div>

        <!-- Select Toll Booth -->
        <div class="mt-3 grid">
          <label for="branch">Toll Booth</label>
          
          <InputText
              v-model="selectedBranch"
              class="w-full md:max-w-[400px]"
              placeholder="Office"
              value="office"
              required
              readonly
            />
        </div>

        <!-- Payment Date -->
        <div class="mt-3 grid">
          <label for="date">Payment Date</label>
          <input
            v-model="date"
            type="date"
            class="h-[45px] border border-slate-200 px-2 rounded outline-none w-full"
            id="date"
            name="date"
            required
          />
        </div>

        <!-- Confirm and Cancel Buttons -->
        <div class="grid sm:grid-cols-2 gap-5 mt-3">
          <Button
            type="submit"
            icon="pi pi-check"
            severity="success"
            label="Confirm"
            class="w-full"
          />
          <RouterLink to="/officeteller">
            <Button
              severity="secondary"
              icon="pi pi-times"
              label="Cancel"
              class="w-full"
            />
          </RouterLink>
        </div>
      </form>
    </div>

      <div class="grid grid-rows-2 grid-cols-1 md:grid md:grid-rows-2 md:grid-cols-1">
         <div class="p-5 shadow bg-white rounded-[10px] w-full">
    <div class=" grid grid-rows-1 grid-cols-2 gap-1">
      <h2 class="text-[18px] font-bold">Delinquencies</h2>
    
    </div>
   
    <div class="scrollable-list mt-2">
      <ul>
      <li v-for="(delinquency, index) in visibleDelinquencies" :key="delinquency.id" class="mt-2 p-2 border rounded">
        <p><strong>Date:</strong> {{ delinquency.date_of_payment }}</p>
        <p><strong>Status:</strong> {{ delinquency.status }}</p>
      </li>
    </ul>
    <p v-if="delinquencies.length === 0" class="text-gray-500">
      No delinquencies for the selected unit.
    </p>
    <div v-if="delinquencies.length > 0" class="mt-3 p-2 border rounded">
    <p><strong>Total Amount:</strong> {{ totalAmount }}</p>
  </div>

<div class="p-5 shadow bg-white rounded-[10px] w-full">
  <div class=" grid grid-rows-1 grid-cols-2 gap-1">
    <h2 class="text-[18px] font-bold">Payments</h2>
  <div class="scrollable-list mt-2">
      <ul>
      <li v-for="(transaction, index) in visibleTransactions" :key="transaction.id" class="mt-2 p-2 border rounded">
        <p><strong>Date:</strong> {{ transaction.date_of_payment }}</p>
        <p><strong>Status:</strong> {{ transaction.type }}</p>
        <p><strong>Date of Delinquency:</strong> {{ new Date(transaction.date).toISOString().split('T')[0] }}</p>
        <p><strong>Amount:</strong> {{ transaction.amount }}</p>
      </li>
    </ul>
    <p v-if="transactions.length === 0" class="text-gray-500">
      No transactions for the selected unit.
    </p>
    <p v-if="visibleTransactions.length > 0" class="font-bold mt-3">
      <strong>Total Amount: </strong> {{ totalPaymentAmount }}
    </p>
</div> 

      
        </div>
    

 
  </div>
  
 
  
</div>


    </div>
    </div>
    </div>

    
  </main>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      units: [],
      selectedUnit: null,
      branches: [{ label: "Office", value: "office" }],
      date: "",
      error: "",
      success: "",
      teller: "",
      delinquencies: [],
      transactions: []
    };
  },

  created() {
    this.fetchUnits();
  },

  setup() {
    const teller = ref({
      id: null,
      username: "",
      first_name: "",
      last_name: "",
    });

    axios
      .get("https://qrmcpass.loca.lt/Teller", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        teller.value = response.data;
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });

    return { teller };
  },mounted() {
    
    this.fetchUnitDelinquencies();
    setInterval(() => {
      this.fetchUnitDelinquencies();
    }, 2000); 
    this.fetchTransaction();
    setInterval(() => {
      this.fetchTransaction();
    }, 2000); 
  },
  computed: {
    visibleDelinquencies() {
      return this.showMore ? this.delinquencies : this.delinquencies.slice(0, 5);
    },visibleTransactions() {
      return this.showMore ? this.transactions : this.transactions.slice(0, 5);
    }, totalAmount() {
  // Ensure selectedUnit exists and has an id
  if (!this.selectedUnit || !this.selectedUnit.id) return 0;

  // Define the multiplier based on unit type
  const multiplier = this.selectedUnit.unit_type === 'motorela' ? 6 :
                     this.selectedUnit.unit_type === 'multicab' ? 11 : 0;

  // Calculate the total amount for unpaid delinquencies
  return this.delinquencies.filter(delinquency => delinquency.status === 'unpaid')
    .reduce((total, delinquency) => {
      return total + multiplier;
    }, 0); // Start with a total of 0
}, totalPaymentAmount() {
    return this.visibleTransactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  }
  },
  methods: {
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
    clearError() {
      this.error = "";
    },

    clearSuccess() {
      this.success = "";
    },

    fetchUnits() {
      axios
        .get("https://qrmcpass.loca.lt/units", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          this.units = response.data.units;
        })
        .catch((error) => {
          console.error("Error fetching units:", error);
        });
    },

    fetchUnitDelinquencies() {
  if (this.selectedUnit) {
    axios
      .get(`https://qrmcpass.loca.lt/units/${this.selectedUnit.id}/delinquencies`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        // Filter delinquencies to only include those with a status of 'unpaid'
        this.delinquencies = response.data.delinquencies.filter(delinquency => delinquency.status === "unpaid");
        console.log(this.delinquencies);
      })
      .catch((error) => {
        console.error("Error fetching delinquencies:", error);
      });
  }
},fetchTransaction() {
    if (this.selectedUnit) {
      axios
        .get(`https://qrmcpass.loca.lt/unit/${this.selectedUnit.id}/transactions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
  console.log(response.data); // Check the full structure of the response
  this.transactions = response.data.transactions.filter(
    transaction => transaction.type === "delinquency payment"
  );
})
        .catch((error) => {
          console.error("Error fetching transaction:", error);
        });
    }
  },

    deduct() {
      if (!this.selectedUnit) {
        this.error = "Please select a unit";
        return;
      }

      let unitType = this.selectedUnit.unit_type;
      let amount = unitType === "motorela" ? 6 : unitType === "multicab" ? 11 : 0;

      let data = {
        unit_id: this.selectedUnit.id,
        date: this.date,
        unit_type: this.selectedUnit.unit_type,
        selectedBranch: this.selectedBranch,
        amount: amount,
        teller: this.teller.id,
      };
      console.log("the data: ",data);
      axios.post("https://qrmcpass.loca.lt/paymentdel", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.message === "Payment Successful with Delinquency") {
            this.selectedUnit = null;
            this.date = "";
            this.success = response.data.message;
          } else {
            this.error = response.data.message;
          }
        })
        .catch((error) => {
          if (error.response && error.response.data.error) {
            this.error = error.response.data.error;
          } else {
            this.error = "An error occurred. Please try again.";
          }
        });
    },
  },
};
</script>
