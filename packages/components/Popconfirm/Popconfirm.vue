<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TooltipInstance } from '../Tooltip';
import { addUnit } from '@boy-element/utils';
import type { PopconfirmProps, PopconfirmEmits } from './types';

import ErTooltip from '../Tooltip/Tooltip.vue';
import ErButton from '../Button/Button.vue';
import ErIcon from '../Icon/Icon.vue';

defineOptions({
  name: 'ErPopconfirm'
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '',
  confirmButtonType: 'primary',
  confirmButtonText: 'Yes',
  cancelButtonText: 'No',
  icon: 'question-circle',
  iconColor: '#f90',
  hideAfter: 200,
  width: 150
});

const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }));

function hidePopper() {
  tooltipRef.value?.hide();
}

function confirm(e: MouseEvent) {
  emits('confirm', e);
  hidePopper();
}

function cancel(e: MouseEvent) {
  emits('cancel', e);
  hidePopper();
}
</script>
<template>
  <er-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="er-popconfirm" :style="style">
        <div class="er-popconfirm_main">
          <er-icon
            v-if="!hideIcon && icon"
            :icon="icon"
            :color="iconColor"
          ></er-icon>
          {{ title }}
        </div>
        <div class="er-popconfirm__action">
          <er-button
            class="er-popconfirm_cancel"
            size="small"
            :type="cancelButtonType"
            @click="cancel"
          >
            {{ cancelButtonText }}
          </er-button>
          <er-button
            class="er-popconfirm_confirm"
            size="small"
            :type="confirmButtonType"
            @click="confirm"
          >
            {{ confirmButtonText }}
          </er-button>
        </div>
      </div>
    </template>
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </er-tooltip>
</template>

<style scoped>
@import './style.css';
</style>
