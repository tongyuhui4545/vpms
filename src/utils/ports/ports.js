
/**solar/tracker参数数据 */
let ports = {
    solar: [
        {
            id: 'manufacturer',
            label: '品牌',
            en: 'Manufacturer',
            subset: false,
            mode: 'input',
            edit: false,
            required: true,
            visible: true,
            confirm: false
        },
        {
            id: 'module_type',
            label: '组件类型',
            en: 'Module series',
            subset: false,
            mode: 'select',
            edit: false,
            required: true,
            visible: true,
            confirm: false,
            options: [
                {
                    value: '0',
                    label: 'c-Si (Crystalline Silicon)'
                },
                {
                    value: '1',
                    label: 'Thin Film'
                }
            ]
        },
        {
            id: 'is_bifacial',
            label: '',
            en: 'Bifacial',
            subset: false,
            mode: 'radio',
            edit: false,
            required: true,
            visible: true,
            confirm: false,
            options: [
                {
                    value: true,
                    label: 'Yes'
                },
                {
                    value: false,
                    label: 'No'
                }
            ]
        },
        {
            id: 'model',
            label: '型号',
            en: 'Model',
            subset: false,
            mode: 'input',
            edit: false,
            required: true,
            visible: true,
            confirm: false
        },
        {
            id: 'Mechanical parameters',
            label: '机械参数',
            en: 'Mechanical parameters',
            subset: true,
            content: [
                {
                    id: 'cell_orientation',
                    label: '电池片规格',
                    en: 'Cell type',
                    mode: 'input',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'junction_box_location',
                    label: '接线盒位置',
                    en: 'Junction box location',
                    mode: 'input',
                    edit: false,
                    required: true,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'connector',
                    label: '连接器',
                    en: 'Connector*N',
                    mode: 'select',
                    edit: true,
                    required: true,
                    visible: true,
                    confirm: true,
                    confirm_id: 'connector_confirm',
                    options: [
                        {
                            value: '0',
                            label: 'In series'
                        },
                        {
                            value: '1',
                            label: 'Skip stringing'
                        },
                        {
                            value: '2',
                            label: 'Flip connected'
                        }
                    ]
                },
                {
                    id: 'fuse_rating',
                    label: '保险丝额定值',
                    en: 'Fuse rating (A)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: true,
                    confirm: true
                },
                {
                    id: 'output_cable_pos',
                    label: '正极出线长',
                    en: 'Output cable-positive (mm)',
                    mode: 'number',
                    edit: true,
                    required: true,
                    visible: true,
                    confirm: true,
                    confirm_id: 'output_cable_pos_confirm'
                },
                {
                    id: 'output_cable_neg',
                    label: '负极出线长',
                    en: 'Output cable-negative (mm)',
                    mode: 'number',
                    edit: true,
                    required: true,
                    visible: true,
                    confirm: true,
                    confirm_id: 'output_cable_neg_confirm'
                },
                {
                    id: 'glass',
                    label: '玻璃',
                    en: 'Glass',
                    mode: 'input',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'frame',
                    label: '框架',
                    en: 'Frame',
                    mode: 'input',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'weight',
                    label: '重量',
                    en: 'Weight (kg)',
                    mode: 'number',
                    edit: false,
                    required: true,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'width',
                    label: '宽',
                    en: 'Width (mm)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'height',
                    label: '高',
                    en: 'Height (mm)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'thickness',
                    label: '厚度',
                    en: 'Thickness (mm)',
                    mode: 'number',
                    edit: false,
                    required: true,
                    visible: false,
                    confirm: false
                }
            ]
        },
        {
            id: 'Electrical characteristics (STC:AM1.5 1000W/m² 25℃)',
            label: '电气特性',
            en: 'Electrical characteristics (STC:AM1.5 1000W/m² 25℃)',
            subset: true,
            content: [
                {
                    id: 'maximum_power',
                    label: '最大功率',
                    en: 'Maximum power (Pmax/W)',
                    mode: 'number',
                    edit: false,
                    required: true,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'open_circuit_voltage',
                    label: '开路电压',
                    en: 'Open circuit voltage (Voc/V)',
                    mode: 'number',
                    edit: false,
                    required: true,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'short_circuit_current',
                    label: '短路电流',
                    en: 'Short circuit current(Isc/A)',
                    mode: 'number',
                    edit: false,
                    required: true,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'voltage_at_maximum_power',
                    label: '最大功率电压',
                    en: 'Voltage at maximum power(Vmp/V)',
                    mode: 'number',
                    edit: false,
                    required: true,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'current_at_maximum_power',
                    label: '最大功率电流',
                    en: 'Current at maximum power(Imp/A)',
                    mode: 'number',
                    edit: false,
                    required: true,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'module_efficiency',
                    label: '组件效率',
                    en: 'Module efficiency(%)',
                    mode: 'number-decimal',
                    edit: false,
                    required: true,
                    visible: false,
                    confirm: false
                }
            ]
        },
        {
            id: 'Operating parameters',
            label: '操作参数',
            en: 'Operating parameters',
            subset: true,
            content: [
                {
                    id: 'operational_temperature',
                    label: '操作温度',
                    en: 'Operational temperature (℃)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'power_output_tolerance',
                    label: '功率输出公差',
                    en: 'Power output tolerance (W)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'voc_and_isc_tolerance',
                    label: 'Voc 和 Isc 公差',
                    en: 'Voc and isc tolerance (%)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'maximum_system_voltage',
                    label: '最大系统电压',
                    en: 'Maximum system voltage (V)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'maximum_series_fuse_rating',
                    label: '最大串联保险丝额定值',
                    en: 'Maximum series fuse rating (A)',
                    mode: 'number',
                    edit: false,
                    required: true,
                    visible: true,
                    confirm: false
                },
                {
                    id: 'nominal_operating_cell_temperature',
                    label: '标称工作电池温度',
                    en: 'Nominal operating cell temperature (℃)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'protection_class',
                    label: '防护等级',
                    en: 'Protection class',
                    mode: 'input',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'fire_rating',
                    label: '防火等级',
                    en: 'Fire rating',
                    mode: 'input',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'bifacial_gain',
                    label: '双面性（当Bifacial是yes才显示）',
                    en: 'Bifacial gain (%)',
                    mode: 'number-decimal',
                    edit: false,
                    required: true,
                    visible: true,
                    confirm: false
                }
            ]
        },
        {
            id: 'Mechanical loading',
            label: '机械加载',
            en: 'Mechanical loading',
            subset: true,
            content: [
                {
                    id: 'front_side_maximum_static_loading',
                    label: '正面最大静态负载',
                    en: 'Front side maximum static loading (Pa)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'rear_side_maximum_static_loading',
                    label: '背面最大静载荷',
                    en: 'Rear side maximum static loading (Pa)',
                    mode: 'number',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'hailstone_test',
                    label: '冰雹测试',
                    en: 'Hailstone test',
                    mode: 'input',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                }
            ]
        },
        {
            id: 'Temperature Ratings (STC)',
            label: '温度额定值 (STC)',
            en: 'Temperature ratings (STC)',
            subset: true,
            content: [
                {
                    id: 'temperature_coefficient_of_isc',
                    label: 'Isc 的温度系数',
                    en: 'Temperature coefficient of isc (%/℃)',
                    mode: 'number-decimal',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'temperature_coefficient_of_voc',
                    label: 'Voc 温度系数',
                    en: 'Temperature coefficient of Voc (%/℃)',
                    mode: 'number-decimal',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                },
                {
                    id: 'temperature_coefficient_of_pmax',
                    label: 'Pmax 的温度系数',
                    en: 'Temperature coefficient of Pmax (%/℃)',
                    mode: 'number-decimal',
                    edit: false,
                    required: false,
                    visible: false,
                    confirm: false
                }
            ]
        }
    ],
    tracker: [
        {
            id: 'manufacturer',
            label: '品牌',
            en: 'Manufacturer',
            mode: 'input',
            edit: false,
            required: true,
            visible: true,
            confirm: false
        },
        {
            id: 'series',
            label: '系列名称',
            en: 'Configuration',
            mode: 'input',
            edit: false,
            required: true,
            visible: true,
            confirm: false
        },
        {
            id: 'bha_gap_width',
            label: 'BHA处宽度',
            en: 'BHA gap width (ft)',
            mode: 'input',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'motor_gap_width',
            label: '电机处宽度',
            en: 'Motor gap width (ft)',
            mode: 'input',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'maximum_pier_height',
            label: '支架离地最大高度',
            en: 'Maximum pier height (ft)',
            mode: 'input',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'pile_position',
            label: '桩的位置（用板子数确定各个桩的位置，文本形式）',
            en: 'Pile position',
            mode: 'input',
            edit: true,
            required: false,
            visible: false,
            confirm: true
        }
    ],
    combination: [
        {
            id: 'module_to_module_spacing',
            label: '板间距',
            en: 'Module to module spacing (mm)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'bha_gap_extender',
            label: 'BHA处跳线',
            en: 'BHA gap extender (ft)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'motor_gap_extender',
            label: '电机跳线',
            en: 'Motor gap extender (ft)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'of_modules_per_string',
            label: '板子数每串',
            en: 'Number of modules per string (pcs)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'row_to_row_spacing',
            label: '桩间距',
            en: 'Row to row spacing (ft)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'bha_quantity',
            label: 'BHA数量',
            en: 'BHA quantity',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'modules_per_tracker',
            label: '每个支架上有多少块板子',
            en: 'Modules per tracker (pcs)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'maximum_current_factor',
            label: '最大电流系数',
            en: 'Maximum current factor',
            mode: 'range',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'overload_protection_factor',
            label: '过载保护系数',
            en: 'Overload protection factor',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'maximum_overload_protection_current',
            label: '最大过载保护电流 (A)',
            en: 'Maximum overload protection current',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'module_connection',
            label: '组件连接方式（多种：顺接，跳接，正反接）',
            en: 'Module connection*N',
            mode: 'select',
            edit: true,
            required: true,
            visible: true,
            confirm: true,
            options: [
                {
                    value: '0',
                    label: 'in series'
                },
                {
                    value: '1',
                    label: 'skip stringing'
                },
                {
                    value: '2',
                    label: 'flip connected'
                }
            ]
        },
        {
            id: 'module_orientation',
            label: '组件正负极朝向',
            en: 'Module orientation',
            mode: 'input',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'cab_or_trench',
            label: '',
            en: 'Messenger wire or Trench',
            mode: 'radio',
            edit: true,
            required: true,
            visible: true,
            confirm: true,
            options: [
                {
                    value: 'CAB',
                    label: 'CAB'
                },
                {
                    value: 'Trench',
                    label: 'Trench'
                }
            ]
        },
        {
            id: 'cbx_outlet_length',
            label: '汇流箱出线长度',
            en: 'CBX outlet length (ft)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'cbx_height',
            label: '汇流箱高度',
            en: 'CBX height (ft)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'distance_from_cbx_to_row_head',
            label: '汇流箱到支架头部的距离',
            en: 'Distance from CBX to row head (ft)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'cab_height',
            label: 'CAB 高度',
            en: 'Hanger height (ft)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        },
        {
            id: 'trench_depth',
            label: '穿管深度',
            en: 'Trench depth (ft)',
            mode: 'number',
            edit: true,
            required: true,
            visible: true,
            confirm: true
        }
    ]
}
export default ports;