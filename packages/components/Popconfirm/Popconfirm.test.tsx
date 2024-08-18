import { describe, it, test, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { each, get } from 'lodash-es';
import { ErPopconfirm } from '.';
import type { PopconfirmProps } from './types';

import PopConfirm from './Popconfirm.vue';
import { withInstall } from '@boy-element/utils';

const onConfirm = vi.fn();
const onCancel = vi.fn();

describe('Popconfirm/index.ts', () => {
  //测试withInstall 是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(ErPopconfirm.install).toBeDefined();
  });

  //测试 Popconfirm 组件是否被正确导出
  it('should be exported PopConfirm componnent', () => {
    expect(ErPopconfirm).toBe(PopConfirm);
  });

  //可选： 测试 withInstall 是否增强了 Popconfirm 组件的功能
  it('should enhance Popconfirm component', () => {
    const enhancedPopconfirm = withInstall(PopConfirm);
    expect(enhancedPopconfirm).toBe(ErPopconfirm);
  });

  //可选： 如果你的withInstall 函数有特定的行为或属性，确保它们被正确应用
  it('should apply specific enhancements', () => {
    const enhancedPopconfirm = withInstall(PopConfirm);
    //例如： 如果你的 withInstall 增加了一个特定的方法或属性
    expect(enhancedPopconfirm).toHaveProperty('install');
  });
});

describe('Popconfirm.vue', () => {
  const props = {
    title: 'Test title',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    confirmButtonType: 'primary',
    cancelButtonType: 'info',
    icon: 'check-circle',
    iconColor: 'green',
    hideIcon: false,
    hideAfter: 500,
    width: 200
  } as PopconfirmProps;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it('should accept all props', () => {
    const wrapper = mount(PopConfirm, {
      props
    });

    each(props, (value, key) => {
      expect(get(wrapper.props(), key)).toBe(value);
    });
  });
  it('should render slot content correctly', () => {
    const slotContent = 'Slot Content';
    const wrapper = mount(PopConfirm, {
      props,
      slots: {
        default: slotContent
      }
    });

    expect(wrapper.text()).toContain(slotContent);
  });

  test('popconfirm emits', async () => {
    const wrapper = mount(() => {
      return (
        <div>
          <div id="outside"></div>
          <PopConfirm
            title="Test Title"
            hideIcon={true}
            onConfirm={onConfirm}
            onCancel={onCancel}
          >
            <button id="trigger">trigger</button>
          </PopConfirm>
        </div>
      );
    });

    const triggerNode = wrapper.find('#trigger');
    expect(triggerNode.exists()).toBeTruthy();

    triggerNode.trigger('click');
    await vi.runAllTimers();

    expect(wrapper.find('.er-popconfirm').exists()).toBeTruthy();
    const confirmBtn = wrapper.find('.er-popconfirm_confirm');
    expect(confirmBtn.exists()).toBeTruthy();

    confirmBtn.trigger('click');
    await vi.runAllTimers();
    expect(wrapper.find('.er-popconfirm').exists()).toBeFalsy();
    expect(onConfirm).toBeCalled();

    triggerNode.trigger('click');
    await vi.runAllTimers();
    expect(wrapper.find('.er-popconfirm').exists()).toBeTruthy();

    const cancelBtn = wrapper.find('.er-popconfirm_cancel');
    expect(cancelBtn.exists()).toBeTruthy();

    cancelBtn.trigger('click');
    await vi.runAllTimers();
    expect(wrapper.find('.er-popconfirm').exists()).toBeFalsy();
    expect(onCancel).toBeCalled();
  });
});
