import { shallowMount } from '@vue/test-utils';
// testing components atoms
import Avatar from '@/components/atoms/Avatar.vue';
import Button from '@/components/atoms/Button.vue';
import Badge from '@/components/atoms/Badge.vue';
import Checkbox from '@/components/atoms/Checkbox.vue';
import Icon from '@/components/atoms/Icon.vue';
import Input from '@/components/atoms/Input.vue';
import Radio from '@/components/atoms/Radio.vue';
import Thumbnail from '@/components/atoms/Thumbnail.vue';
import Toggle from '@/components/atoms/Toggle.vue';
import Tooltip from '@/components/atoms/Tooltip.vue';
import OptionItem from '@/components/atoms/OptionItem.vue';
import NavItem from '@/components/atoms/NavItem.vue';
import NavExpandableItem from '@/components/atoms/NavExpandableItem.vue';

// testing props

describe('Button.vue', () => {
  it('should have "Button" as name', () => {
    expect(Button.name).toBe('HelpButton');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render buttonLabel', () => {
    const wrapper = shallowMount(Button, {
      props: {
        label: 'hello world',
      },
    });

    expect(wrapper.vm.buttonLabel).toMatch('HELLO WORLD');
  });

  it('renders all props in button', () => {
    const wrapper = shallowMount(Button, {
      props: {
        bgColor: 'red-500',
        label: 'Search Address',
        color: 'midnight',
        icon: 'search',
        loading: true,
        disabled: false,
        type: 'submit',
      },
    });
    expect(wrapper.props().label).toBe('Search Address');
    expect(wrapper.props().color).toBe('midnight');
    expect(wrapper.props().disabled).toBe(false);
    expect(wrapper.props().loading).toBe(true);
  });
});

describe('Avatar.vue', () => {
  it('should have "Avatar" as name', () => {
    expect(Avatar.name).toBe('HelpAvatar');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Avatar);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders all props in avatar', () => {
    const wrapper = shallowMount(Avatar, {
      props: {
        size: 80,
        src: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        placeholder: 'Image Url',
      },
    });
    expect(wrapper.props().size).toBeGreaterThan(60);
    expect(wrapper.props().src).toMatch('images');
    expect(wrapper.props().placeholder).not.toMatch('Ulr');
  });
});

describe('Badge.vue', () => {
  it('should have "Badge" as name', () => {
    expect(Badge.name).toBe('HelpBadge');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Badge);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders all props in badge', () => {
    const wrapper = shallowMount(Badge, {
      props: {
        label: 'chevron-up',
        icon: 'chevron-up',
        color: 'positive',
      },
    });
    expect(wrapper.props().label).toMatch('');
    expect(wrapper.props().icon).toMatch('');
    expect(wrapper.props().color).toBe('positive');
  });
});

describe('Checkbox.vue', () => {
  it('should have "Checkbox" as name', () => {
    expect(Checkbox.name).toBe('HelpCheckbox');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Checkbox);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders all props in checkbox', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        checked: true,
        label: '',
        disabled: false,
      },
    });
    expect(wrapper.props().checked).toBeTruthy();
    expect(wrapper.props().label).toMatch('');
    expect(wrapper.props().disabled).toBeFalsy();
  });
});

describe('Icon.vue', () => {
  it('should have "Icon" as name', () => {
    expect(Icon.name).toBe('HelpIcon');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Icon);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders all props in icon', () => {
    const wrapper = shallowMount(Icon, {
      props: {
        name: 'search',
        size: 6,
      },
    });
    expect(wrapper.props().name).toMatch('');
    expect(wrapper.props().size).toBeGreaterThanOrEqual(4);
  });
});

describe('Input.vue', () => {
  it('should have "Input" as name', () => {
    expect(Input.name).toBe('HelpInput');
  });

  it('should render correctly', () => {
    expect(Input.$el).toMatchSnapshot();
  });

  // it('renders all props in input', () => {
  //   const wrapper = shallowMount(Input, {
  //     props: {
  //       modelValue: 'search',
  //       label: 'Search Address',
  //       placeholder: 'Jl.Bintara 14',
  //       type: 'text',
  //       rows: 3,
  //       leftIcon: 'search',
  //       rightIcon: '',
  //       searchBar: false,
  //       mask: '#####',
  //       background: 'white',
  //       disabled: true,
  //       pointer: false,
  //     },
  //   });
  //   expect(wrapper.props().modelValue).toMatch('');
  //   expect(wrapper.props().label).toMatch('');
  //   expect(wrapper.props().placeholder).toMatch('');
  //   expect(wrapper.props().type).toBe('text');
  //   expect(wrapper.props().rows).toBeGreaterThanOrEqual(3);
  //   expect(wrapper.props().leftIcon).toMatch('');
  //   expect(wrapper.props().rightIcon).toMatch('');
  //   expect(wrapper.props().searchBar).toBeFalsy();
  //   expect(wrapper.props().mask).toMatch('');
  //   expect(wrapper.props().background).toMatch('white');
  //   expect(wrapper.props().disabled).toBeTruthy();
  //   expect(wrapper.props().pointer).toBeFalsy();
  // });
});

describe('Radio.vue', () => {
  it('should have "Radio" as name', () => {
    expect(Radio.name).toBe('HelpRadio');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Radio);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders all props in radio', () => {
    const wrapper = shallowMount(Radio, {
      props: {
        modelValue: false,
        group: '',
        label: '',
        disabled: false,
      },
    });
    expect(wrapper.props().modelValue).toBeFalsy();
    expect(wrapper.props().group).toMatch('');
    expect(wrapper.props().label).toMatch('');
    expect(wrapper.props().disabled).toBeFalsy();
  });
});

describe('Thumbnail.vue', () => {
  it('should have "Thumbnail" as name', () => {
    expect(Thumbnail.name).toBe('HelpThumbnail');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Thumbnail);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders all props in thumbnail', () => {
    const wrapper = shallowMount(Thumbnail, {
      props: {
        width: 160,
        height: 90,
        src: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        useBg: false,
      },
    });
    expect(wrapper.props().width).toBeGreaterThanOrEqual(100);
    expect(wrapper.props().height).toBeLessThanOrEqual(100);
    expect(wrapper.props().src).toMatch('');
    expect(wrapper.props().useBg).toBeFalsy();
  });
});

describe('Toggle.vue', () => {
  it('should have "Toggle" as name', () => {
    expect(Toggle.name).toBe('HelpToggle');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Toggle);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders all props in toggle', () => {
    const wrapper = shallowMount(Toggle, {
      props: {
        modelValue: true,
      },
    });
    expect(wrapper.props().modelValue).not.toBeFalsy();
  });
});

describe('Tooltip.vue', () => {
  it('should have "Tooltip" as name', () => {
    expect(Tooltip.name).toBe('HelpTooltip');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(Tooltip);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders all props in tooltip', () => {
    const wrapper = shallowMount(Tooltip, {
      props: {
        text: 'Hello World',
      },
    });
    expect(wrapper.props().text).toMatch('');
  });
});

describe('OptionItem.vue', () => {
  it('should have "OptionItem" as name', () => {
    expect(OptionItem.name).toBe('HelpOptionItem');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(OptionItem);
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('NavItem.vue', () => {
  it('should have "NavItem" as name', () => {
    expect(NavItem.name).toBe('HelpNavItem');
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(NavItem, {
      props: {
        menu: {
          path: '/',
          icon: 'search',
          label: 'dashboard',
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('NavExpandableItem.vue', () => {
  it('should have "NavExpandableItem" as name', () => {
    expect(NavExpandableItem.name).toBe('HelpNavExpandableItem');
  });

  it('should render correctly', () => {
    expect(NavExpandableItem.$el).toMatchSnapshot();
  });

  it('renders all props in expandable item', async () => {
    const arrSubs = [
      {
        path: 'merchant',
        icon: 'search',
        label: 'merchant',
      },
    ];
    const wrapper = shallowMount(NavExpandableItem, {
      props: {
        menu: {
          path: '/',
          icon: 'search',
          label: 'dashboard',
          subMenu: arrSubs,
        },
        miniSidebar: false,
      },
    });
    expect(wrapper.props().miniSidebar).toBeFalsy();
  });
});
