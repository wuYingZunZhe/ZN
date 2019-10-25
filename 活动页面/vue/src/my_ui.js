import Vue from 'vue'
//import MuseUI from 'muse-ui';
//import 'muse-ui/dist/muse-ui.css';
//import ElementUI from 'element-ui';

//Vue.use(MuseUI);
//Vue.use(ElementUI);

//element 按需引入
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import {
    // Pagination,
    // Dialog,
    // Autocomplete,
    // Dropdown,
    // DropdownMenu,
    // DropdownItem,
    // Menu,
    // Submenu,
    // MenuItem,
    // MenuItemGroup,
    // Input,
    // InputNumber,
    // Radio,
    // RadioGroup,
    // RadioButton,
    // Checkbox,
    // CheckboxButton,
    // CheckboxGroup,
    // Switch,
    // Select,
    // Option,
    // OptionGroup,
    // Button,
    // ButtonGroup,
    // Table,
    // TableColumn,
    // DatePicker,
    // TimeSelect,
    // TimePicker,
    // Popover,
    // Tooltip,
    // Breadcrumb,
    // BreadcrumbItem,
    // Form,
    // FormItem,
    // Tabs,
    // TabPane,
    // Tag,
    // Tree,
    // Alert,
    // Slider,
    // Icon,
    Row,
    Col,
    // Upload,
    // Progress,
    // Spinner,
    // Badge,
    // Card,
    // Rate,
    Steps,
    Step,
    // Carousel,
    // CarouselItem,
    // Collapse,
    // CollapseItem,
    // Cascader,
    // ColorPicker,
    // Transfer,
    // Container,
    // Header,
    // Aside,
    // Main,
    // Footer,
    // Timeline,
    // TimelineItem,
    // Link,
    // Divider,
    // Image,
    // Calendar,
    // Backtop,
    // PageHeader,
    // CascaderPanel,
    // Loading,
    // MessageBox,
    // Message,
    // Notification
  } from 'element-ui';
  
//   Vue.use(Pagination);
//   Vue.use(Dialog);
//   Vue.use(Autocomplete);
//   Vue.use(Dropdown);
//   Vue.use(DropdownMenu);
//   Vue.use(DropdownItem);
//   Vue.use(Menu);
//   Vue.use(Submenu);
//   Vue.use(MenuItem);
//   Vue.use(MenuItemGroup);
//   Vue.use(Input);
//   Vue.use(InputNumber);
//   Vue.use(Radio);
//   Vue.use(RadioGroup);
//   Vue.use(RadioButton);
//   Vue.use(Checkbox);
//   Vue.use(CheckboxButton);
//   Vue.use(CheckboxGroup);
//   Vue.use(Switch);
//   Vue.use(Select);
//   Vue.use(Option);
//   Vue.use(OptionGroup);
//   Vue.use(Button);
//   Vue.use(ButtonGroup);
//   Vue.use(Table);
//   Vue.use(TableColumn);
//   Vue.use(DatePicker);
//   Vue.use(TimeSelect);
//   Vue.use(TimePicker);
//   Vue.use(Popover);
//   Vue.use(Tooltip);
//   Vue.use(Breadcrumb);
//   Vue.use(BreadcrumbItem);
//   Vue.use(Form);
//   Vue.use(FormItem);
//   Vue.use(Tabs);
//   Vue.use(TabPane);
//   Vue.use(Tag);
//   Vue.use(Tree);
//   Vue.use(Alert);
//   Vue.use(Slider);
//   Vue.use(Icon);
   Vue.use(Row);
   Vue.use(Col);
//   Vue.use(Upload);
//   Vue.use(Progress);
//   Vue.use(Spinner);
//   Vue.use(Badge);
//   Vue.use(Card);
//   Vue.use(Rate);
   Vue.use(Steps);
   Vue.use(Step);
//   Vue.use(Carousel);
//   Vue.use(CarouselItem);
//   Vue.use(Collapse);
//   Vue.use(CollapseItem);
//   Vue.use(Cascader);
//   Vue.use(ColorPicker);
//   Vue.use(Transfer);
//   Vue.use(Container);
//   Vue.use(Header);
//   Vue.use(Aside);
//   Vue.use(Main);
//   Vue.use(Footer);
//   Vue.use(Timeline);
//   Vue.use(TimelineItem);
//   Vue.use(Link);
//   Vue.use(Divider);
//   Vue.use(Image);
//   Vue.use(Calendar);
//   Vue.use(Backtop);
//   Vue.use(PageHeader);
//   Vue.use(CascaderPanel);
  
//   Vue.use(Loading.directive);
  
//   Vue.prototype.$loading = Loading.service;
//   Vue.prototype.$msgbox = MessageBox;
//   Vue.prototype.$alert = MessageBox.alert;
//   Vue.prototype.$confirm = MessageBox.confirm;
//   Vue.prototype.$prompt = MessageBox.prompt;
//   Vue.prototype.$notify = Notification;
//   Vue.prototype.$message = Message;


//museUi 按需引用
import 'muse-ui/lib/styles/base.less';
import {
// Alert,
  AppBar,
//   AutoComplete,
//   Avatar,
//   Badge,
//   BottomNav,
//   BottomSheet,
//   Breadcrumbs,
  Button,
//   Card,
//   Checkbox,
//   Chip,
//   DateInput,
//   DataTable,
//   Dialog,
//   Divider,
//   Drawer,
//   ExpansionPanel,
//   Form,
//   Grid,
//   GridList,
//   Helpers,
//   Icon,
  List,
//LoadMore,
  Menu,
//   Pagination,
//   Paper,
//   Picker,
//   Popover,
//   Progress,
//   Radio,
//   Select,
//   SlidePicker,
//   Slider,
//   Snackbar,
//   Stepper,
//   SubHeader,
//   Switch,
//   Tabs,
//   TextField,
//   Tooltip,
//   theme
} from 'muse-ui';
//import 'muse-ui/lib/styles/theme.less';

// Vue.use(Alert);
 Vue.use(AppBar);
// Vue.use(AutoComplete);
// Vue.use(Avatar);
// Vue.use(Badge);
// Vue.use(BottomNav);
// Vue.use(BottomSheet);
// Vue.use(Breadcrumbs);
 Vue.use(Button);
// Vue.use(Card);
// Vue.use(Checkbox);
// Vue.use(Chip);
// Vue.use(DateInput);
// Vue.use(DataTable);
// Vue.use(Dialog);
// Vue.use(Divider);
// Vue.use(Drawer);
// Vue.use(ExpansionPanel);
// Vue.use(Form);
// Vue.use(Grid);
// Vue.use(GridList);
// Vue.use(Helpers);
// Vue.use(Icon);
 Vue.use(List);
// Vue.use(LoadMore);
 Vue.use(Menu);
// Vue.use(Pagination);
// Vue.use(Paper);
// Vue.use(Picker);
// Vue.use(Popover);
// Vue.use(Progress);
// Vue.use(Radio);
// Vue.use(Select);
// Vue.use(SlidePicker);
// Vue.use(Slider);
// Vue.use(Snackbar);
// Vue.use(Stepper);
// Vue.use(SubHeader);
// Vue.use(Switch);
// Vue.use(Tabs);
// Vue.use(TextField);
// Vue.use(Tooltip);