import {items as roleItems} from '../roleManageMock/responseData'
import Mock from 'mockjs'
// 菜单数据
const menuItems = [
    {
        'id': 1,
        'created_at': '2023-08-28 23:37:32',
        'updated_at': '2023-10-30 15:11:10',
        'created_by': 'admin',
        'updated_by': 'admin',
        'menu_name': '默认菜单',
        'default': true,
        'use': true,
        'menu': []
    },
    {
        'id': 2,
        'created_at': '2023-08-29 18:17:34',
        'updated_at': '2023-10-30 15:10:57',
        'created_by': 'admin',
        'updated_by': 'admin',
        'menu_name': '外链',
        'default': false,
        'use': false,
        'menu': [
            // {
            //     'id': 'SysSetting',
            //     'url': '/sysSetting',
            //     'auth': [
            //         {
            //             'key': 'checkAuth',
            //             'type': 'check',
            //             'label': '查看',
            //             'value': false
            //         },
            //         {
            //             'key': 'operateAuth',
            //             'type': 'operate',
            //             'label': '操作',
            //             'value': false
            //         }
            //     ],
            //     'icon': 'cw-icon weops-setting',
            //     'name': '系统设置',
            //     'originName': '管理/系统设置'
            // },
            // {
            //     'id': 'Dashboard',
            //     'url': '/dashboard',
            //     'auth': [
            //         {
            //             'key': 'checkAuth',
            //             'type': 'check',
            //             'label': '查看',
            //             'value': false
            //         },
            //         {
            //             'key': 'operateAuth',
            //             'type': 'operate',
            //             'label': '操作',
            //             'value': false
            //         }
            //     ],
            //     'icon': 'cw-icon weops-dashboard-fill',
            //     'name': '仪表盘',
            //     'sortIndex': 0,
            //     'originName': '监控/仪表盘',
            //     'belongModule': 'dashboard'
            // },
            // {
            //     'id': 'TopologyMap',
            //     'url': '/topologyMap',
            //     'auth': [
            //         {
            //             'key': 'checkAuth',
            //             'type': 'check',
            //             'label': '查看',
            //             'value': false
            //         },
            //         {
            //             'key': 'operateAuth',
            //             'type': 'operate',
            //             'label': '操作',
            //             'value': false
            //         }
            //     ],
            //     'icon': 'cw-icon weops-topology-landscape-fill',
            //     'name': '拓扑图',
            //     'sortIndex': 1,
            //     'originName': '监控/拓扑图',
            //     'belongModule': 'custom_topology'
            // },
            // {
            //     'id': 'ApplicationCard',
            //     'url': '/appCard',
            //     'auth': [
            //         {
            //             'key': 'checkAuth',
            //             'type': 'check',
            //             'label': '查看',
            //             'value': false
            //         },
            //         {
            //             'key': 'operateAuth',
            //             'type': 'operate',
            //             'label': '操作',
            //             'value': false
            //         }
            //     ],
            //     'icon': 'cw-icon weops-application',
            //     'name': '应用',
            //     'sortIndex': 3,
            //     'originName': '监控/应用',
            //     'belongModule': 'monitor_mgmt'
            // },
            // {
            //     'id': 'BasicMonitor',
            //     'auth': [
            //         {
            //             'key': 'checkAuth',
            //             'type': 'check',
            //             'label': '查看',
            //             'value': false
            //         },
            //         {
            //             'key': 'operateAuth',
            //             'type': 'operate',
            //             'label': '操作',
            //             'value': false
            //         }
            //     ],
            //     'icon': 'cw-icon weops-monitor-fill-1',
            //     'name': '基础监控',
            //     'children': [],
            //     'sortIndex': 4,
            //     'originName': '监控/基础监控',
            //     'belongModule': 'monitor_mgmt'
            // },
            {
                'id': 'datainsight7457',
                'key': '050v9',
                'url': 'http://datainsight.weops.com/',
                'auth': [
                    {
                        'key': 'checkAuth',
                        'type': 'check',
                        'label': '查看',
                        'value': false
                    }
                ],
                'icon': 'cw-icon weops-lian-jie',
                'name': 'datainsight',
                'isUrl': true
            },
            {
                'id': 'SysUser',
                'url': '/sysUser',
                'auth': [
                    {
                        'key': 'checkAuth',
                        'type': 'check',
                        'label': '查看',
                        'value': false
                    },
                    {
                        'key': 'operateAuth',
                        'type': 'operate',
                        'label': '操作',
                        'value': false
                    }
                ],
                'icon': 'cw-icon weops-user',
                'name': '用户管理',
                'originName': '系统管理/用户管理'
            },
            {
                'id': 'OperateLog',
                'url': '/operateLog',
                'auth': [
                    {
                        'key': 'checkAuth',
                        'type': 'check',
                        'label': '查看',
                        'value': false
                    }
                ],
                'icon': 'cw-icon weops-operation-log-fill',
                'name': '操作日志',
                'originName': '系统管理/操作日志'
            },
            {
                'id': 'SysRole',
                'url': '/sysRole',
                'auth': [
                    {
                        'key': 'checkAuth',
                        'type': 'check',
                        'label': '查看',
                        'value': false
                    },
                    {
                        'key': 'operateAuth',
                        'type': 'operate',
                        'label': '操作',
                        'value': false
                    }
                ],
                'icon': 'cw-icon weops-role',
                'name': '角色管理',
                'originName': '系统管理/角色管理'
            }
        ]
    }
    // {
    //     'id': 3,
    //     'created_at': '2023-08-31 16:26:24',
    //     'updated_at': '2023-10-27 18:31:43',
    //     'created_by': 'pwm',
    //     'updated_by': 'admin',
    //     'menu_name': '云平台监控菜单权限+外链',
    //     'default': false,
    //     'use': false,
    //     'menu': [
    //         {
    //             'id': 'CloudMonitorvmware',
    //             'url': '/CloudMonitor/vmware',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'name': 'VMware',
    //             'originName': '云平台监控/VMware'
    //         },
    //         {
    //             'id': 'CloudMonitorqcloud',
    //             'url': '/CloudMonitor/qcloud',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'name': '腾讯云',
    //             'originName': '云平台监控/腾讯云'
    //         },
    //         {
    //             'id': 'CloudMonitoraliyun',
    //             'url': '/CloudMonitor/aliyun',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'name': '阿里云',
    //             'originName': '云平台监控/阿里云'
    //         },
    //         {
    //             'id': 'CloudMonitormanageone',
    //             'url': '/CloudMonitor/manageone',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'name': 'ManageOne',
    //             'originName': '云平台监控/ManageOne'
    //         },
    //         {
    //             'id': 'CloudMonitorhuaweicloud',
    //             'url': '/CloudMonitor/huaweicloud',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'name': '华为云',
    //             'originName': '云平台监控/华为云'
    //         },
    //         {
    //             'id': 'CloudMonitorsangforhci',
    //             'url': '/CloudMonitor/sangforhci',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'name': 'SangforHCI',
    //             'originName': '云平台监控/SangforHCI'
    //         },
    //         {
    //             'id': 'k8sMonitorPod',
    //             'url': '/k8sMonitor/k8s_pod',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'icon': 'cw-icon weops-container',
    //             'name': 'Pod',
    //             'originName': 'K8S监控/Pod',
    //             'belongModule': 'monitor_mgmt'
    //         },
    //         {
    //             'id': 'k8sMonitorNode',
    //             'url': '/k8sMonitor/bk_node',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'icon': 'cw-icon weops-container',
    //             'name': 'Node',
    //             'originName': 'K8S监控/Node',
    //             'belongModule': 'monitor_mgmt'
    //         },
    //         {
    //             'id': 'SysSetting',
    //             'url': '/sysSetting',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'icon': 'cw-icon weops-setting',
    //             'name': '系统设置',
    //             'originName': '系统管理/系统设置'
    //         },
    //         {
    //             'id': 'datainsight7943',
    //             'key': '6q3uz',
    //             'url': 'http://datainsight.weops.com/alerts',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 }
    //             ],
    //             'icon': 'cw-icon weops-lian-jie',
    //             'name': 'datainsight',
    //             'isUrl': true
    //         },
    //         {
    //             'id': 'gongJu',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'name': '工具',
    //             'children': [
    //                 {
    //                     'id': 'jiQiRen5737',
    //                     'key': 'v2cyk',
    //                     'url': 'https://gpt.deadgay.cn/#/chat',
    //                     'auth': [
    //                         {
    //                             'key': 'checkAuth',
    //                             'type': 'check',
    //                             'label': '查看',
    //                             'value': false
    //                         }
    //                     ],
    //                     'icon': 'cw-icon weops-lian-jie',
    //                     'name': '机器人',
    //                     'isUrl': true
    //                 }
    //             ]
    //         },
    //         {
    //             'id': 'SysRole',
    //             'url': '/sysRole',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'icon': 'cw-icon weops-role',
    //             'name': '角色管理',
    //             'originName': '系统管理/角色管理'
    //         },
    //         {
    //             'id': 'BasicMonitor',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'icon': 'cw-icon weops-monitor-fill-1',
    //             'name': '基础监控',
    //             'children': [],
    //             'sortIndex': 4,
    //             'originName': '监控/基础监控',
    //             'belongModule': 'monitor_mgmt'
    //         }
    //     ]
    // },
    // {
    //     'id': 4,
    //     'created_at': '2023-09-18 18:21:03',
    //     'updated_at': '2023-10-25 17:53:44',
    //     'created_by': 'admin',
    //     'updated_by': 'admin',
    //     'menu_name': '云平台监控菜单测试',
    //     'default': false,
    //     'use': false,
    //     'menu': [
    //         {
    //             'id': 'SysSetting',
    //             'url': '/sysSetting',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'icon': 'cw-icon weops-setting',
    //             'name': '系统设置',
    //             'originName': '管理/系统设置'
    //         },
    //         {
    //             'id': 'yunPingTaiJianKong',
    //             'auth': [
    //                 {
    //                     'key': 'checkAuth',
    //                     'type': 'check',
    //                     'label': '查看',
    //                     'value': false
    //                 },
    //                 {
    //                     'key': 'operateAuth',
    //                     'type': 'operate',
    //                     'label': '操作',
    //                     'value': false
    //                 }
    //             ],
    //             'name': '云平台监控',
    //             'children': [
    //                 {
    //                     'id': 'CloudMonitormanageone',
    //                     'url': '/CloudMonitor/manageone',
    //                     'auth': [
    //                         {
    //                             'key': 'checkAuth',
    //                             'type': 'check',
    //                             'label': '查看',
    //                             'value': false
    //                         },
    //                         {
    //                             'key': 'operateAuth',
    //                             'type': 'operate',
    //                             'label': '操作',
    //                             'value': false
    //                         }
    //                     ],
    //                     'name': 'ManageOne',
    //                     'originName': '云平台监控/ManageOne'
    //                 },
    //                 {
    //                     'id': 'CloudMonitorhuaweicloud',
    //                     'url': '/CloudMonitor/huaweicloud',
    //                     'auth': [
    //                         {
    //                             'key': 'checkAuth',
    //                             'type': 'check',
    //                             'label': '查看',
    //                             'value': false
    //                         },
    //                         {
    //                             'key': 'operateAuth',
    //                             'type': 'operate',
    //                             'label': '操作',
    //                             'value': false
    //                         }
    //                     ],
    //                     'name': '华为云',
    //                     'originName': '云平台监控/华为云'
    //                 },
    //                 {
    //                     'id': 'CloudMonitoraliyun',
    //                     'url': '/CloudMonitor/aliyun',
    //                     'auth': [
    //                         {
    //                             'key': 'checkAuth',
    //                             'type': 'check',
    //                             'label': '查看',
    //                             'value': false
    //                         },
    //                         {
    //                             'key': 'operateAuth',
    //                             'type': 'operate',
    //                             'label': '操作',
    //                             'value': false
    //                         }
    //                     ],
    //                     'name': '阿里云',
    //                     'originName': '云平台监控/阿里云'
    //                 },
    //                 {
    //                     'id': 'CloudMonitorsangforhci',
    //                     'url': '/CloudMonitor/sangforhci',
    //                     'auth': [
    //                         {
    //                             'key': 'checkAuth',
    //                             'type': 'check',
    //                             'label': '查看',
    //                             'value': false
    //                         },
    //                         {
    //                             'key': 'operateAuth',
    //                             'type': 'operate',
    //                             'label': '操作',
    //                             'value': false
    //                         }
    //                     ],
    //                     'name': 'SangforHCI',
    //                     'originName': '云平台监控/SangforHCI'
    //                 },
    //                 {
    //                     'id': 'CloudMonitorqcloud',
    //                     'url': '/CloudMonitor/qcloud',
    //                     'auth': [
    //                         {
    //                             'key': 'checkAuth',
    //                             'type': 'check',
    //                             'label': '查看',
    //                             'value': false
    //                         },
    //                         {
    //                             'key': 'operateAuth',
    //                             'type': 'operate',
    //                             'label': '操作',
    //                             'value': false
    //                         }
    //                     ],
    //                     'name': '腾讯云',
    //                     'originName': '云平台监控/腾讯云'
    //                 },
    //                 {
    //                     'id': 'CloudMonitorvmware',
    //                     'url': '/CloudMonitor/vmware',
    //                     'auth': [
    //                         {
    //                             'key': 'checkAuth',
    //                             'type': 'check',
    //                             'label': '查看',
    //                             'value': false
    //                         },
    //                         {
    //                             'key': 'operateAuth',
    //                             'type': 'operate',
    //                             'label': '操作',
    //                             'value': false
    //                         }
    //                     ],
    //                     'name': 'VMware',
    //                     'originName': '云平台监控/VMware'
    //                 }
    //             ]
    //         }
    //     ]
    // }
]

// 人员管理数据
const userItems = [
    {
        'id': 2,
        'bk_username': 'admin',
        'chname': '\u8d85\u7ba1'
    },
    {
        'id': 3,
        'bk_username': 'randy61',
        'chname': 'randy61'
    },
    {
        'id': 7,
        'bk_username': 'pwm',
        'chname': '\u72d7\u86cb'
    },
    {
        'id': 8,
        'bk_username': 'eric',
        'chname': 'Eric'
    },
    {
        'id': 10,
        'bk_username': 'windyzhao',
        'chname': '\u8d75\u91d1\u76df'
    },
    {
        'id': 11,
        'bk_username': 'windyzhao1',
        'chname': '\u8d75\u91d1\u76df\u5c0f\u5f1f'
    }
]

// 用户列表数据
const userListItems = [
    {
        'id': 157,
        'bk_user_id': 138,
        'bk_username': 'test_qjj_009',
        'chname': 'test_qjj_009',
        'email': 'asjida@qq.com',
        'phone': '13556789765',
        'roles': [
            3
        ],
        'local': true,
        'departments': [
            {
                'id': 1,
                'name': '总公司',
                'order': 1,
                'full_name': '总公司'
            }
        ],
        'leaders': [],
        'status': 'NORMAL'
    },
    {
        'id': 156,
        'bk_user_id': 137,
        'bk_username': 'test_qjj_090',
        'chname': 'test_qjj_090',
        'email': 'asjida@qq.com',
        'phone': '13556789765',
        'roles': [
            3
        ],
        'local': true,
        'departments': [
            {
                'id': 1,
                'name': '总公司',
                'order': 1,
                'full_name': '总公司'
            }
        ],
        'leaders': [],
        'status': 'NORMAL'
    },
    {
        'id': 155,
        'bk_user_id': 136,
        'bk_username': 'test_qjj_09',
        'chname': 'test_qjj_09',
        'email': 'asjida@qq.com',
        'phone': '13556789765',
        'roles': [
            3
        ],
        'local': true,
        'departments': [
            {
                'id': 1,
                'name': '总公司',
                'order': 1,
                'full_name': '总公司'
            }
        ],
        'leaders': [],
        'status': 'NORMAL'
    }
]

// 双因子认证配置
let loginSetData = Mock.mock({
    'default_domain': 'default.local',
    'auth_type': ['mail'],
    'auth_white_list': {
        'role|2': [
            {
                'id|+1': 100,
                'role_name': '@word',
                'user_count|0-5': 0,
                'isChecked': true
            }
        ],
        'user': []
    },
    'two_factor_enable': false
})

// 角色列表(白名单)
const roleItemsWhite = Mock.mock({
    'items|3': [
        {
            'id|+1': 110,
            'role_name': '@word',
            'user_count|1-20': 1
        }
    ]
})

export default {
    getMenuData: (params) => {
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: {
                page: 1,
                total_page: 1,
                count: menuItems.length,
                next: null,
                previous: null,
                items: menuItems
            }
        }
        res.data.items = menuItems.filter(item => item.menu_name.includes(params.search))
        return res
    },
    getMenuById: (params) => {
        const menuData = menuItems.find(item => item.id === params.id)
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: menuData
        }
        return res
    },
    deleteMenu: (params) => {
        const deleteIndex = menuItems.findIndex(item => item.id === params.id)
        menuItems.splice(deleteIndex, 1)
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: {'success': true}
        }
    },
    useMenu: (params) => {
        menuItems.forEach(item => {
            if (item.id === params.id) {
                item.use = true
            } else {
                item.use = false
            }
        })
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: {success: true}
        }
    },
    searchUserList: (params) => {
        const res = {
            result: true,
            data: {
                count: 0,
                items: userItems
            }
        }
        res.data.count = userItems.length
        res.data.items = userItems.filter(item => item.chname.includes(params.search))
        return res
    },
    setUsersByRole: (params) => {
        const roleItem = roleItems.find(item => item.id === params.id)
        const userList = userItems.filter(item => params.users.includes(item.id))
        roleItem.users = userList.map(item => {
            return {
                bk_user_id: Mock.mock('@id'),
                bk_username: item.bk_username,
                chname: item.chname,
                id: item.id
            }
        })
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: '设置成功！'
        }
        return res
    },
    getUserList: (params) => {
        const res = {
            'result': true,
            'code': '20000',
            'message': 'success',
            'data': {
                'page': 1,
                'total_page': 1,
                'count': 0,
                'next': 'http://paas.weops.com/o/weops_saas/system/mgmt/user_manage/get_users/?page=2&page_size=20&roles=%5B%5D&search=',
                'previous': null,
                'items': userListItems
            }
        }
        res.data.count = userListItems.length
        res.data.total_page = Math.ceil(res.data.count / params.page_size)
        res.data.items = userListItems.filter(item => item.bk_username.includes(params.search))
        return res
    },
    deleteUser: (params) => {
        const deleteIndex = userListItems.findIndex(item => item.bk_user_id = params.bk_user_id)
        userListItems.splice(deleteIndex, 1)
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: '删除用户成功！'
        }
        return res
    },
    setUserRoles: (params) => {
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: '设置用户角色成功！'
        }
        return res
    },
    editUser: (params) => {
        const editItem = userListItems.find(item => item.id === params.id)
        if (editItem) {
            editItem.bk_username = params.display_name
            editItem.email = params.email
            editItem.phone = params.telephone
            editItem.leaders = params.leader
        }
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: '修改用户成功'
        }
        return res
    },
    createUser: (params) => {
        const newUser = {
            id: Mock.mock('@integer'),
            bk_user_id: Mock.mock('@integer'),
            bk_username: params.username,
            chname: params.display_name,
            email: params.email,
            phone: params.telephone,
            local: true,
            roles: [],
            departments: [
                {
                    id: Mock.mock('@integer'),
                    name: '总公司',
                    order: 1,
                    full_name: '总公司'
                }
            ],
            leaders: [params.leader],
            status: 'NORMAL'
        }
        userListItems.unshift(newUser)
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: '创建用户成功'
        }
        return res
    },
    updateUserStatus: (params) => {
        const updateUser = userListItems.find(item => item.id === params.id)
        updateUser.status = params.body.status
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: '修改用户状态成功'
        }
        return res
    },
    resetPassword: (params) => {
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: '重置密码成功'
        }
        return res
    },
    getDomainList: (params) => {
        const res = {
            result: true,
            data: ['default.local', 'test']
        }
        return res
    },
    getLoginSet: (params) => {
        const res = {
            result: true,
            data: loginSetData
        }
        return res
    },
    setDomain: (params) => {
        loginSetData.default_domain = params.default_domain
        const res = {
            result: true
        }
        return res
    },
    updateLoginSet: (params) => {
        loginSetData = params
        const res = {
            result: true
        }
        return res
    },
    searchRoleList: (params) => {
        const res = {
            result: true,
            data: {
                count: 0,
                items: roleItemsWhite.items
            }
        }
        res.data.count = roleItemsWhite.items.length
        return res
    },
    createMenuManage: (params) => {
        const newMenu = {
            id: +Mock.mock('@id'),
            created_at: Mock.mock('@now'),
            updated_at: Mock.mock('@now'),
            created_by: 'admin',
            updated_by: 'admin',
            menu_name: params.menu_name,
            default: false,
            use: false,
            menu: params.menu
        }
        menuItems.push(newMenu)
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: newMenu
        }
        return res
    }
}
