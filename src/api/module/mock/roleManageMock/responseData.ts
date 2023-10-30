export default {
    getRoleListData: (params) => {
        const items = [
            {
                built_in: true,
                created_at: '2023-08-28 23:45:47',
                describe: '本角色为IT服务台工单管理员，拥有查看所有工单的权限',
                id: 5,
                is_super: false,
                role_name: 'itsm_admin_group',
                users: [
                    {
                        bk_user_id: 3,
                        bk_username: 'pwm',
                        chname: '狗蛋',
                        id: 7
                    },
                    {
                        bk_user_id: 8,
                        bk_username: 'anneyan',
                        chname: '颜缨',
                        id: 13
                    },
                    {
                        bk_user_id: 15,
                        bk_username: 'hunter82',
                        chname: 'hunter82',
                        id: 19
                    }
                ]
            },
            {
                built_in: true,
                created_at: '2023-08-28 23:45:47',
                describe: '本角色为超级管理员，有全部的权限',
                id: 4,
                is_super: true,
                role_name: 'iadmin_group',
                users: [
                    {
                        bk_user_id: 1,
                        bk_username: 'admin',
                        chname: '超管',
                        id: 2
                    },
                    {
                        bk_user_id: 3,
                        bk_username: 'pwm',
                        chname: '狗蛋',
                        id: 7
                    },
                    {
                        bk_user_id: 4,
                        bk_username: 'eric',
                        chname: 'Eric',
                        id: 8
                    },
                    {
                        bk_user_id: 7,
                        bk_username: 'kayla',
                        chname: 'kayla',
                        id: 12
                    }
                ]
            },
            {
                built_in: true,
                created_at: '2023-08-28 23:45:47',
                describe: '本角色为普通用户，需要超级管理员赋予其他权限',
                id: 3,
                is_super: false,
                role_name: 'normal_group',
                users: [
                    {
                        bk_user_id: 4,
                        bk_username: 'eric',
                        chname: 'Eric',
                        id: 8
                    },
                    {
                        bk_user_id: 14,
                        bk_username: 'chadneal',
                        chname: 'chadneal',
                        id: 18
                    }
                ]
            }
        ]
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: {
                count: 3,
                items: []
            }
        }
        res.data.items = items.filter(item => item.role_name.includes(params.search))
        return res
    }
}
