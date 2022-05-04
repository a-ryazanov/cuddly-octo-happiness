<template>
  <ValidationObserver slim ref="form">
    <form class="d-flex flex-column">
      <div class="d-flex mb-3">
        <div
          v-for="(field, index) in formFields"
          :key="field.id"
          :class="{
          'ms-3': index !== 0
        }"
          class="w-25"
        >
          <ValidationProvider
            v-slot="{ errors }"
            :rules="field.validationRules"
            slim
          >
            <label :for="field.id" class="form-label">
              {{ field.label }}
            </label>

            <input
              v-model="localFormData[field.name]"
              :id="field.id"
              :type="field.type"
              :aria-describedby="getDescriptionFieldId(field)"
              :class="{
                'border-danger': errors.length > 0,
              }"
              class="form-control"
            >

            <div
              :id="getDescriptionFieldId(field)"
              :class="{
              'text-danger': errors.length > 0,
            }"
              class="form-text"
            >
              {{ errors[0] || field.description }}
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div>
        <button
          class="btn btn-primary"
          @click.prevent="handleSubmit"
        >
          Применить
        </button>

        <button
          class="btn btn-secondary m-sm-2"
          @click.prevent="$emit('reset')"
        >
          Сбросить
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'TheTaskForm',

  model: {
    prop: 'formData',
  },

  props: {
    formData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localFormData: {},
    };
  },

  computed: {
    formFields() {
      return [
        {
          id: 'inputTotal',
          name: 'total',
          type: 'number',
          validationRules: 'required|numeric|min_value:1',
          label: 'Всего записей',
          description: 'Сколько создать записей в таблице?',
        },
        {
          id: 'inputPerPage',
          name: 'perPage',
          type: 'number',
          validationRules: 'required|numeric|min_value:1',
          label: 'Записей на странице',
          description: 'Сколько показывать записей на странице?',
        },
        {
          id: 'inputWords',
          name: 'words',
          validationRules: 'required',
          label: 'Слова для генерации',
          description: 'Перечисленные через запятую слова, участвующие в заполнении данных',
        },
      ];
    },
  },

  watch: {
    formData(newValue) {
      this.localFormData = {
        ...newValue,
      };
    },
  },

  created() {
    Object.keys(this.formData).forEach((key) => {
      this.$set(this.localFormData, key, this.formData[key]);
    });
  },

  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.form.validate();

      if (isValid) {
        this.$emit('input', this.localFormData);
        this.$emit('submit');
      }
    },

    getDescriptionFieldId(field) {
      return `${field.id}Description`;
    },
  },
};
</script>
