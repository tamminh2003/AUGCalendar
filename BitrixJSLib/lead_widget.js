BX.ready(function () {
    BX.Main.filterManager.push('lead_widget', new BX.Main.Filter({
      'FIELDS': [
        {
          'ID': 'field_RESPONSIBLE_ID_lead_widget',
          'TYPE': 'DEST_SELECTOR',
          'NAME': 'RESPONSIBLE_ID',
          'LABEL': 'Responsible person',
          'VALUES': {
            '_label': '',
            '_value': ''
          },
          'MULTIPLE': false,
          'PLACEHOLDER': '',
          'HTML': '<!--\'start_frame_cache_b6FSBG\'--><script src="/bitrix/components/bitrix/main.ui.selector/templates/.default/script.js"></script><script>\n\tBX.ready(function() {\n\n\t\tvar f = function(params) {\n\t\t\tvar selectorId = \'RESPONSIBLE_ID\';\n\t\t\tvar inputId = (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& BX.type.isNotEmptyString(params.inputId)\n\t\t\t\t\t? params.inputId\n\t\t\t\t\t: false);\n\t\t\tvar inputBoxId = false;\n\t\t\tvar inputContainerId = false;\n\t\t\tvar containerId = (typeof params != \'undefined\' && params.containerId != \'undefined\' ? params.containerId : false);\n\t\t\tvar bindId = (containerId ? containerId : inputId);\n\t\t\tvar openDialogWhenInit = (\n\t\t\t\ttypeof params == \'undefined\'\n\t\t\t\t|| typeof params.openDialogWhenInit == \'undefined\'\n\t\t\t\t|| !!params.openDialogWhenInit\n\t\t\t);\n\n\t\t\tvar fieldName = false;\n\n\t\t\tif (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& typeof params.id != \'undefined\'\n\t\t\t\t&& params.id != selectorId\n\t\t\t)\n\t\t\t{\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tBX.Main.SelectorV2.create({\n\t\t\t\tapiVersion: 2,\n\t\t\t\tid: selectorId,\n\t\t\t\tfieldName: fieldName,\n\t\t\t\tpathToAjax: \'/bitrix/components/bitrix/main.ui.selector/ajax.php\',\n\t\t\t\tinputId: inputId,\n\t\t\t\tinputBoxId: inputBoxId,\n\t\t\t\tinputContainerId: inputContainerId,\n\t\t\t\tbindId: bindId,\n\t\t\t\tcontainerId: containerId,\n\t\t\t\ttagId: BX(\'\'),\n\t\t\t\topenDialogWhenInit: openDialogWhenInit,\n\t\t\t\tbindNode: BX(\'\'),\n\t\t\t\toptions: {\'multiple\':false,\'eventInit\':\'BX.Filter.DestinationSelector:openInit\',\'eventOpen\':\'BX.Filter.DestinationSelector:open\',\'context\':\'CRM_WIDGET_FILTER_RESPONSIBLE_ID\',\'popupAutoHide\':\'N\',\'useSearch\':\'N\',\'userNameTemplate\':\'#NAME# #LAST_NAME#\',\'useClientDatabase\':\'Y\',\'enableLast\':\'Y\',\'enableUsers\':\'Y\',\'enableDepartments\':\'Y\',\'allowAddUser\':\'N\',\'allowAddCrmContact\':\'N\',\'allowAddSocNetGroup\':\'N\',\'allowSearchCrmEmailUsers\':\'N\',\'allowSearchNetworkUsers\':\'N\',\'useNewCallback\':\'Y\',\'focusInputOnSelectItem\':\'N\',\'focusInputOnSwitchTab\':\'N\',\'landing\':\'N\',\'contextCode\':\'U\',\'enableAll\':\'N\',\'enableSonetgroups\':\'N\',\'allowEmailInvitation\':\'N\',\'allowSearchEmailUsers\':\'N\',\'departmentSelectDisable\':\'Y\',\'isNumeric\':\'Y\',\'prefix\':\'U\'},\n\t\t\t\tcallback : {\n\t\t\t\t\tselect: BX.Filter.DestinationSelectorManager.onSelect.bind(null, \'Y\', \'U\'),\n\t\t\t\t\tunSelect: null,\n\t\t\t\t\topenDialog: BX.Filter.DestinationSelectorManager.onDialogOpen,\n\t\t\t\t\tcloseDialog: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenSearch: null,\n\t\t\t\t\tcloseSearch: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenEmailAdd: null,\n\t\t\t\t\tcloseEmailAdd: null\t\t\t\t},\n\t\t\t\tcallbackBefore : {\n\t\t\t\t\tselect: null,\n\t\t\t\t\topenDialog: null,\n\t\t\t\t\tcontext: null,\n\t\t\t\t},\n\t\t\t\titems : {\n\t\t\t\t\tselected: [],\n\t\t\t\t\tundeletable: [],\n\t\t\t\t\thidden: []\t\t\t\t},\n\t\t\t\tentities: {\n\t\t\t\t\tusers: \'\',\n\t\t\t\t\tgroups: \'\',\n\t\t\t\t\tsonetgroups: \'\',\n\t\t\t\t\tdepartment: \'\'\t\t\t\t}\n\t\t\t});\n\n\t\t\tBX.removeCustomEvent(window, "BX.Filter.DestinationSelector:openInit", arguments.callee);\n\t\t};\n\n\t\t\t\t\tBX.addCustomEvent(window, "BX.Filter.DestinationSelector:openInit", f);\n\t\t\t\n\t});\n</script>\n\n<!--\'end_frame_cache_b6FSBG\'-->',
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        },
        {
          'ID': 'field_PERIOD',
          'TYPE': 'DATE',
          'NAME': 'PERIOD',
          'SUB_TYPE': [
          ],
          'SUB_TYPES': [
            {
              'NAME': 'This month',
              'VALUE': 'CURRENT_MONTH'
            },
            {
              'NAME': 'Current quarter',
              'VALUE': 'CURRENT_QUARTER'
            },
            {
              'NAME': 'Last 7 days',
              'VALUE': 'LAST_7_DAYS'
            },
            {
              'NAME': 'Last 30 days',
              'VALUE': 'LAST_30_DAYS'
            },
            {
              'NAME': 'Last 60 days',
              'VALUE': 'LAST_60_DAYS'
            },
            {
              'NAME': 'Last 90 days',
              'VALUE': 'LAST_90_DAYS'
            },
            {
              'NAME': 'Month',
              'VALUE': 'MONTH'
            },
            {
              'NAME': 'Quarter',
              'VALUE': 'QUARTER'
            },
            {
              'NAME': 'Year',
              'VALUE': 'YEAR'
            }
          ],
          'MONTH': {
            'VALUE': '6',
            'NAME': 'June'
          },
          'MONTHS': [
            {
              'VALUE': '1',
              'NAME': 'January'
            },
            {
              'VALUE': '2',
              'NAME': 'February'
            },
            {
              'VALUE': '3',
              'NAME': 'March'
            },
            {
              'VALUE': '4',
              'NAME': 'April'
            },
            {
              'VALUE': '5',
              'NAME': 'May'
            },
            {
              'VALUE': '6',
              'NAME': 'June'
            },
            {
              'VALUE': '7',
              'NAME': 'July'
            },
            {
              'VALUE': '8',
              'NAME': 'August'
            },
            {
              'VALUE': '9',
              'NAME': 'September'
            },
            {
              'VALUE': '10',
              'NAME': 'October'
            },
            {
              'VALUE': '11',
              'NAME': 'November'
            },
            {
              'VALUE': '12',
              'NAME': 'December'
            }
          ],
          'QUARTER': {
            'VALUE': '2',
            'NAME': 'II'
          },
          'QUARTERS': [
            {
              'VALUE': '1',
              'NAME': 'I'
            },
            {
              'VALUE': '2',
              'NAME': 'II'
            },
            {
              'VALUE': '3',
              'NAME': 'III'
            },
            {
              'VALUE': '4',
              'NAME': 'IV'
            }
          ],
          'YEAR': {
            'NAME': '2021',
            'VALUE': '2021'
          },
          'YEARS': [
            {
              'NAME': '2026',
              'VALUE': '2026'
            },
            {
              'NAME': '2025',
              'VALUE': '2025'
            },
            {
              'NAME': '2024',
              'VALUE': '2024'
            },
            {
              'NAME': '2023',
              'VALUE': '2023'
            },
            {
              'NAME': '2022',
              'VALUE': '2022'
            },
            {
              'NAME': '2021',
              'VALUE': '2021'
            },
            {
              'NAME': '2020',
              'VALUE': '2020'
            },
            {
              'NAME': '2019',
              'VALUE': '2019'
            },
            {
              'NAME': '2018',
              'VALUE': '2018'
            },
            {
              'NAME': '2017',
              'VALUE': '2017'
            },
            {
              'NAME': '2016',
              'VALUE': '2016'
            },
            {
              'NAME': '2015',
              'VALUE': '2015'
            },
            {
              'NAME': '2014',
              'VALUE': '2014'
            },
            {
              'NAME': '2013',
              'VALUE': '2013'
            },
            {
              'NAME': '2012',
              'VALUE': '2012'
            },
            {
              'NAME': '2011',
              'VALUE': '2011'
            },
            {
              'NAME': '2010',
              'VALUE': '2010'
            },
            {
              'NAME': '2009',
              'VALUE': '2009'
            },
            {
              'NAME': '2008',
              'VALUE': '2008'
            },
            {
              'NAME': '2007',
              'VALUE': '2007'
            },
            {
              'NAME': '2006',
              'VALUE': '2006'
            },
            {
              'NAME': '2005',
              'VALUE': '2005'
            },
            {
              'NAME': '2004',
              'VALUE': '2004'
            },
            {
              'NAME': '2003',
              'VALUE': '2003'
            },
            {
              'NAME': '2002',
              'VALUE': '2002'
            },
            {
              'NAME': '2001',
              'VALUE': '2001'
            }
          ],
          'VALUES': {
            '_allow_year': '',
            '_from': '',
            '_to': '',
            '_days': '',
            '_month': '',
            '_quarter': '',
            '_year': ''
          },
          'PLACEHOLDER': '',
          'LABEL': 'Reporting period',
          'ENABLE_TIME': false,
          'SELECT_PARAMS': {
            'isMulti': false
          },
          'YEARS_SWITCHER': '',
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        }
      ],
      'DEFAULT_PRESETS': [
        {
          'ID': 'filter_current_month',
          'TITLE': 'Current month',
          'SORT': '0',
          'FIELDS': [
            {
              'ID': 'field_PERIOD',
              'TYPE': 'DATE',
              'NAME': 'PERIOD',
              'SUB_TYPE': {
                'NAME': 'This month',
                'VALUE': 'CURRENT_MONTH'
              },
              'SUB_TYPES': [
                {
                  'NAME': 'This month',
                  'VALUE': 'CURRENT_MONTH'
                },
                {
                  'NAME': 'Current quarter',
                  'VALUE': 'CURRENT_QUARTER'
                },
                {
                  'NAME': 'Last 7 days',
                  'VALUE': 'LAST_7_DAYS'
                },
                {
                  'NAME': 'Last 30 days',
                  'VALUE': 'LAST_30_DAYS'
                },
                {
                  'NAME': 'Last 60 days',
                  'VALUE': 'LAST_60_DAYS'
                },
                {
                  'NAME': 'Last 90 days',
                  'VALUE': 'LAST_90_DAYS'
                },
                {
                  'NAME': 'Month',
                  'VALUE': 'MONTH'
                },
                {
                  'NAME': 'Quarter',
                  'VALUE': 'QUARTER'
                },
                {
                  'NAME': 'Year',
                  'VALUE': 'YEAR'
                }
              ],
              'MONTH': {
                'VALUE': '6',
                'NAME': 'June'
              },
              'MONTHS': [
                {
                  'VALUE': '1',
                  'NAME': 'January'
                },
                {
                  'VALUE': '2',
                  'NAME': 'February'
                },
                {
                  'VALUE': '3',
                  'NAME': 'March'
                },
                {
                  'VALUE': '4',
                  'NAME': 'April'
                },
                {
                  'VALUE': '5',
                  'NAME': 'May'
                },
                {
                  'VALUE': '6',
                  'NAME': 'June'
                },
                {
                  'VALUE': '7',
                  'NAME': 'July'
                },
                {
                  'VALUE': '8',
                  'NAME': 'August'
                },
                {
                  'VALUE': '9',
                  'NAME': 'September'
                },
                {
                  'VALUE': '10',
                  'NAME': 'October'
                },
                {
                  'VALUE': '11',
                  'NAME': 'November'
                },
                {
                  'VALUE': '12',
                  'NAME': 'December'
                }
              ],
              'QUARTER': {
                'VALUE': '2',
                'NAME': 'II'
              },
              'QUARTERS': [
                {
                  'VALUE': '1',
                  'NAME': 'I'
                },
                {
                  'VALUE': '2',
                  'NAME': 'II'
                },
                {
                  'VALUE': '3',
                  'NAME': 'III'
                },
                {
                  'VALUE': '4',
                  'NAME': 'IV'
                }
              ],
              'YEAR': {
                'NAME': '2021',
                'VALUE': '2021'
              },
              'YEARS': [
                {
                  'NAME': '2026',
                  'VALUE': '2026'
                },
                {
                  'NAME': '2025',
                  'VALUE': '2025'
                },
                {
                  'NAME': '2024',
                  'VALUE': '2024'
                },
                {
                  'NAME': '2023',
                  'VALUE': '2023'
                },
                {
                  'NAME': '2022',
                  'VALUE': '2022'
                },
                {
                  'NAME': '2021',
                  'VALUE': '2021'
                },
                {
                  'NAME': '2020',
                  'VALUE': '2020'
                },
                {
                  'NAME': '2019',
                  'VALUE': '2019'
                },
                {
                  'NAME': '2018',
                  'VALUE': '2018'
                },
                {
                  'NAME': '2017',
                  'VALUE': '2017'
                },
                {
                  'NAME': '2016',
                  'VALUE': '2016'
                },
                {
                  'NAME': '2015',
                  'VALUE': '2015'
                },
                {
                  'NAME': '2014',
                  'VALUE': '2014'
                },
                {
                  'NAME': '2013',
                  'VALUE': '2013'
                },
                {
                  'NAME': '2012',
                  'VALUE': '2012'
                },
                {
                  'NAME': '2011',
                  'VALUE': '2011'
                },
                {
                  'NAME': '2010',
                  'VALUE': '2010'
                },
                {
                  'NAME': '2009',
                  'VALUE': '2009'
                },
                {
                  'NAME': '2008',
                  'VALUE': '2008'
                },
                {
                  'NAME': '2007',
                  'VALUE': '2007'
                },
                {
                  'NAME': '2006',
                  'VALUE': '2006'
                },
                {
                  'NAME': '2005',
                  'VALUE': '2005'
                },
                {
                  'NAME': '2004',
                  'VALUE': '2004'
                },
                {
                  'NAME': '2003',
                  'VALUE': '2003'
                },
                {
                  'NAME': '2002',
                  'VALUE': '2002'
                },
                {
                  'NAME': '2001',
                  'VALUE': '2001'
                }
              ],
              'VALUES': {
                '_allow_year': '',
                '_from': '',
                '_to': '',
                '_days': '',
                '_month': '',
                '_quarter': '',
                '_year': ''
              },
              'PLACEHOLDER': '',
              'LABEL': 'Reporting period',
              'ENABLE_TIME': false,
              'SELECT_PARAMS': {
                'isMulti': false
              },
              'YEARS_SWITCHER': '',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            }
          ],
          'IS_DEFAULT': true,
          'FOR_ALL': true,
          'PINNED': true
        },
        {
          'ID': 'filter_current_quarter',
          'TITLE': 'Current quarter',
          'SORT': '1',
          'FIELDS': [
            {
              'ID': 'field_PERIOD',
              'TYPE': 'DATE',
              'NAME': 'PERIOD',
              'SUB_TYPE': {
                'NAME': 'Current quarter',
                'VALUE': 'CURRENT_QUARTER'
              },
              'SUB_TYPES': [
                {
                  'NAME': 'This month',
                  'VALUE': 'CURRENT_MONTH'
                },
                {
                  'NAME': 'Current quarter',
                  'VALUE': 'CURRENT_QUARTER'
                },
                {
                  'NAME': 'Last 7 days',
                  'VALUE': 'LAST_7_DAYS'
                },
                {
                  'NAME': 'Last 30 days',
                  'VALUE': 'LAST_30_DAYS'
                },
                {
                  'NAME': 'Last 60 days',
                  'VALUE': 'LAST_60_DAYS'
                },
                {
                  'NAME': 'Last 90 days',
                  'VALUE': 'LAST_90_DAYS'
                },
                {
                  'NAME': 'Month',
                  'VALUE': 'MONTH'
                },
                {
                  'NAME': 'Quarter',
                  'VALUE': 'QUARTER'
                },
                {
                  'NAME': 'Year',
                  'VALUE': 'YEAR'
                }
              ],
              'MONTH': {
                'VALUE': '6',
                'NAME': 'June'
              },
              'MONTHS': [
                {
                  'VALUE': '1',
                  'NAME': 'January'
                },
                {
                  'VALUE': '2',
                  'NAME': 'February'
                },
                {
                  'VALUE': '3',
                  'NAME': 'March'
                },
                {
                  'VALUE': '4',
                  'NAME': 'April'
                },
                {
                  'VALUE': '5',
                  'NAME': 'May'
                },
                {
                  'VALUE': '6',
                  'NAME': 'June'
                },
                {
                  'VALUE': '7',
                  'NAME': 'July'
                },
                {
                  'VALUE': '8',
                  'NAME': 'August'
                },
                {
                  'VALUE': '9',
                  'NAME': 'September'
                },
                {
                  'VALUE': '10',
                  'NAME': 'October'
                },
                {
                  'VALUE': '11',
                  'NAME': 'November'
                },
                {
                  'VALUE': '12',
                  'NAME': 'December'
                }
              ],
              'QUARTER': {
                'VALUE': '2',
                'NAME': 'II'
              },
              'QUARTERS': [
                {
                  'VALUE': '1',
                  'NAME': 'I'
                },
                {
                  'VALUE': '2',
                  'NAME': 'II'
                },
                {
                  'VALUE': '3',
                  'NAME': 'III'
                },
                {
                  'VALUE': '4',
                  'NAME': 'IV'
                }
              ],
              'YEAR': {
                'NAME': '2021',
                'VALUE': '2021'
              },
              'YEARS': [
                {
                  'NAME': '2026',
                  'VALUE': '2026'
                },
                {
                  'NAME': '2025',
                  'VALUE': '2025'
                },
                {
                  'NAME': '2024',
                  'VALUE': '2024'
                },
                {
                  'NAME': '2023',
                  'VALUE': '2023'
                },
                {
                  'NAME': '2022',
                  'VALUE': '2022'
                },
                {
                  'NAME': '2021',
                  'VALUE': '2021'
                },
                {
                  'NAME': '2020',
                  'VALUE': '2020'
                },
                {
                  'NAME': '2019',
                  'VALUE': '2019'
                },
                {
                  'NAME': '2018',
                  'VALUE': '2018'
                },
                {
                  'NAME': '2017',
                  'VALUE': '2017'
                },
                {
                  'NAME': '2016',
                  'VALUE': '2016'
                },
                {
                  'NAME': '2015',
                  'VALUE': '2015'
                },
                {
                  'NAME': '2014',
                  'VALUE': '2014'
                },
                {
                  'NAME': '2013',
                  'VALUE': '2013'
                },
                {
                  'NAME': '2012',
                  'VALUE': '2012'
                },
                {
                  'NAME': '2011',
                  'VALUE': '2011'
                },
                {
                  'NAME': '2010',
                  'VALUE': '2010'
                },
                {
                  'NAME': '2009',
                  'VALUE': '2009'
                },
                {
                  'NAME': '2008',
                  'VALUE': '2008'
                },
                {
                  'NAME': '2007',
                  'VALUE': '2007'
                },
                {
                  'NAME': '2006',
                  'VALUE': '2006'
                },
                {
                  'NAME': '2005',
                  'VALUE': '2005'
                },
                {
                  'NAME': '2004',
                  'VALUE': '2004'
                },
                {
                  'NAME': '2003',
                  'VALUE': '2003'
                },
                {
                  'NAME': '2002',
                  'VALUE': '2002'
                },
                {
                  'NAME': '2001',
                  'VALUE': '2001'
                }
              ],
              'VALUES': {
                '_allow_year': '',
                '_from': '',
                '_to': '',
                '_days': '',
                '_month': '',
                '_quarter': '',
                '_year': ''
              },
              'PLACEHOLDER': '',
              'LABEL': 'Reporting period',
              'ENABLE_TIME': false,
              'SELECT_PARAMS': {
                'isMulti': false
              },
              'YEARS_SWITCHER': '',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            }
          ],
          'IS_DEFAULT': true,
          'FOR_ALL': true,
          'PINNED': false
        },
        {
          'ID': 'default_filter',
          'TITLE': 'Filter',
          'SORT': '3',
          'FIELDS': [
            {
              'ID': 'field_RESPONSIBLE_ID_lead_widget',
              'TYPE': 'DEST_SELECTOR',
              'NAME': 'RESPONSIBLE_ID',
              'LABEL': 'Responsible person',
              'VALUES': {
                '_label': '',
                '_value': ''
              },
              'MULTIPLE': false,
              'PLACEHOLDER': '',
              'HTML': '<!--\'start_frame_cache_b6FSBG\'--><script src="/bitrix/components/bitrix/main.ui.selector/templates/.default/script.js"></script><script>\n\tBX.ready(function() {\n\n\t\tvar f = function(params) {\n\t\t\tvar selectorId = \'RESPONSIBLE_ID\';\n\t\t\tvar inputId = (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& BX.type.isNotEmptyString(params.inputId)\n\t\t\t\t\t? params.inputId\n\t\t\t\t\t: false);\n\t\t\tvar inputBoxId = false;\n\t\t\tvar inputContainerId = false;\n\t\t\tvar containerId = (typeof params != \'undefined\' && params.containerId != \'undefined\' ? params.containerId : false);\n\t\t\tvar bindId = (containerId ? containerId : inputId);\n\t\t\tvar openDialogWhenInit = (\n\t\t\t\ttypeof params == \'undefined\'\n\t\t\t\t|| typeof params.openDialogWhenInit == \'undefined\'\n\t\t\t\t|| !!params.openDialogWhenInit\n\t\t\t);\n\n\t\t\tvar fieldName = false;\n\n\t\t\tif (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& typeof params.id != \'undefined\'\n\t\t\t\t&& params.id != selectorId\n\t\t\t)\n\t\t\t{\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tBX.Main.SelectorV2.create({\n\t\t\t\tapiVersion: 2,\n\t\t\t\tid: selectorId,\n\t\t\t\tfieldName: fieldName,\n\t\t\t\tpathToAjax: \'/bitrix/components/bitrix/main.ui.selector/ajax.php\',\n\t\t\t\tinputId: inputId,\n\t\t\t\tinputBoxId: inputBoxId,\n\t\t\t\tinputContainerId: inputContainerId,\n\t\t\t\tbindId: bindId,\n\t\t\t\tcontainerId: containerId,\n\t\t\t\ttagId: BX(\'\'),\n\t\t\t\topenDialogWhenInit: openDialogWhenInit,\n\t\t\t\tbindNode: BX(\'\'),\n\t\t\t\toptions: {\'multiple\':false,\'eventInit\':\'BX.Filter.DestinationSelector:openInit\',\'eventOpen\':\'BX.Filter.DestinationSelector:open\',\'context\':\'CRM_WIDGET_FILTER_RESPONSIBLE_ID\',\'popupAutoHide\':\'N\',\'useSearch\':\'N\',\'userNameTemplate\':\'#NAME# #LAST_NAME#\',\'useClientDatabase\':\'Y\',\'enableLast\':\'Y\',\'enableUsers\':\'Y\',\'enableDepartments\':\'Y\',\'allowAddUser\':\'N\',\'allowAddCrmContact\':\'N\',\'allowAddSocNetGroup\':\'N\',\'allowSearchCrmEmailUsers\':\'N\',\'allowSearchNetworkUsers\':\'N\',\'useNewCallback\':\'Y\',\'focusInputOnSelectItem\':\'N\',\'focusInputOnSwitchTab\':\'N\',\'landing\':\'N\',\'contextCode\':\'U\',\'enableAll\':\'N\',\'enableSonetgroups\':\'N\',\'allowEmailInvitation\':\'N\',\'allowSearchEmailUsers\':\'N\',\'departmentSelectDisable\':\'Y\',\'isNumeric\':\'Y\',\'prefix\':\'U\'},\n\t\t\t\tcallback : {\n\t\t\t\t\tselect: BX.Filter.DestinationSelectorManager.onSelect.bind(null, \'Y\', \'U\'),\n\t\t\t\t\tunSelect: null,\n\t\t\t\t\topenDialog: BX.Filter.DestinationSelectorManager.onDialogOpen,\n\t\t\t\t\tcloseDialog: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenSearch: null,\n\t\t\t\t\tcloseSearch: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenEmailAdd: null,\n\t\t\t\t\tcloseEmailAdd: null\t\t\t\t},\n\t\t\t\tcallbackBefore : {\n\t\t\t\t\tselect: null,\n\t\t\t\t\topenDialog: null,\n\t\t\t\t\tcontext: null,\n\t\t\t\t},\n\t\t\t\titems : {\n\t\t\t\t\tselected: [],\n\t\t\t\t\tundeletable: [],\n\t\t\t\t\thidden: []\t\t\t\t},\n\t\t\t\tentities: {\n\t\t\t\t\tusers: \'\',\n\t\t\t\t\tgroups: \'\',\n\t\t\t\t\tsonetgroups: \'\',\n\t\t\t\t\tdepartment: \'\'\t\t\t\t}\n\t\t\t});\n\n\t\t\tBX.removeCustomEvent(window, "BX.Filter.DestinationSelector:openInit", arguments.callee);\n\t\t};\n\n\t\t\t\t\tBX.addCustomEvent(window, "BX.Filter.DestinationSelector:openInit", f);\n\t\t\t\n\t});\n</script>\n\n<!--\'end_frame_cache_b6FSBG\'-->',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            },
            {
              'ID': 'field_PERIOD',
              'TYPE': 'DATE',
              'NAME': 'PERIOD',
              'SUB_TYPE': {
                'NAME': 'This month',
                'VALUE': 'CURRENT_MONTH'
              },
              'SUB_TYPES': [
                {
                  'NAME': 'This month',
                  'VALUE': 'CURRENT_MONTH'
                },
                {
                  'NAME': 'Current quarter',
                  'VALUE': 'CURRENT_QUARTER'
                },
                {
                  'NAME': 'Last 7 days',
                  'VALUE': 'LAST_7_DAYS'
                },
                {
                  'NAME': 'Last 30 days',
                  'VALUE': 'LAST_30_DAYS'
                },
                {
                  'NAME': 'Last 60 days',
                  'VALUE': 'LAST_60_DAYS'
                },
                {
                  'NAME': 'Last 90 days',
                  'VALUE': 'LAST_90_DAYS'
                },
                {
                  'NAME': 'Month',
                  'VALUE': 'MONTH'
                },
                {
                  'NAME': 'Quarter',
                  'VALUE': 'QUARTER'
                },
                {
                  'NAME': 'Year',
                  'VALUE': 'YEAR'
                }
              ],
              'MONTH': {
                'VALUE': '6',
                'NAME': 'June'
              },
              'MONTHS': [
                {
                  'VALUE': '1',
                  'NAME': 'January'
                },
                {
                  'VALUE': '2',
                  'NAME': 'February'
                },
                {
                  'VALUE': '3',
                  'NAME': 'March'
                },
                {
                  'VALUE': '4',
                  'NAME': 'April'
                },
                {
                  'VALUE': '5',
                  'NAME': 'May'
                },
                {
                  'VALUE': '6',
                  'NAME': 'June'
                },
                {
                  'VALUE': '7',
                  'NAME': 'July'
                },
                {
                  'VALUE': '8',
                  'NAME': 'August'
                },
                {
                  'VALUE': '9',
                  'NAME': 'September'
                },
                {
                  'VALUE': '10',
                  'NAME': 'October'
                },
                {
                  'VALUE': '11',
                  'NAME': 'November'
                },
                {
                  'VALUE': '12',
                  'NAME': 'December'
                }
              ],
              'QUARTER': {
                'VALUE': '2',
                'NAME': 'II'
              },
              'QUARTERS': [
                {
                  'VALUE': '1',
                  'NAME': 'I'
                },
                {
                  'VALUE': '2',
                  'NAME': 'II'
                },
                {
                  'VALUE': '3',
                  'NAME': 'III'
                },
                {
                  'VALUE': '4',
                  'NAME': 'IV'
                }
              ],
              'YEAR': {
                'NAME': '2021',
                'VALUE': '2021'
              },
              'YEARS': [
                {
                  'NAME': '2026',
                  'VALUE': '2026'
                },
                {
                  'NAME': '2025',
                  'VALUE': '2025'
                },
                {
                  'NAME': '2024',
                  'VALUE': '2024'
                },
                {
                  'NAME': '2023',
                  'VALUE': '2023'
                },
                {
                  'NAME': '2022',
                  'VALUE': '2022'
                },
                {
                  'NAME': '2021',
                  'VALUE': '2021'
                },
                {
                  'NAME': '2020',
                  'VALUE': '2020'
                },
                {
                  'NAME': '2019',
                  'VALUE': '2019'
                },
                {
                  'NAME': '2018',
                  'VALUE': '2018'
                },
                {
                  'NAME': '2017',
                  'VALUE': '2017'
                },
                {
                  'NAME': '2016',
                  'VALUE': '2016'
                },
                {
                  'NAME': '2015',
                  'VALUE': '2015'
                },
                {
                  'NAME': '2014',
                  'VALUE': '2014'
                },
                {
                  'NAME': '2013',
                  'VALUE': '2013'
                },
                {
                  'NAME': '2012',
                  'VALUE': '2012'
                },
                {
                  'NAME': '2011',
                  'VALUE': '2011'
                },
                {
                  'NAME': '2010',
                  'VALUE': '2010'
                },
                {
                  'NAME': '2009',
                  'VALUE': '2009'
                },
                {
                  'NAME': '2008',
                  'VALUE': '2008'
                },
                {
                  'NAME': '2007',
                  'VALUE': '2007'
                },
                {
                  'NAME': '2006',
                  'VALUE': '2006'
                },
                {
                  'NAME': '2005',
                  'VALUE': '2005'
                },
                {
                  'NAME': '2004',
                  'VALUE': '2004'
                },
                {
                  'NAME': '2003',
                  'VALUE': '2003'
                },
                {
                  'NAME': '2002',
                  'VALUE': '2002'
                },
                {
                  'NAME': '2001',
                  'VALUE': '2001'
                }
              ],
              'VALUES': {
                '_allow_year': '',
                '_from': '',
                '_to': '',
                '_days': '',
                '_month': '',
                '_quarter': '',
                '_year': ''
              },
              'PLACEHOLDER': '',
              'LABEL': 'Reporting period',
              'ENABLE_TIME': false,
              'SELECT_PARAMS': {
                'isMulti': false
              },
              'YEARS_SWITCHER': '',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            }
          ],
          'IS_DEFAULT': true,
          'FOR_ALL': true
        }
      ],
      'FILTER_ID': 'lead_widget',
      'GRID_ID': '',
      'PRESETS': [
        {
          'ID': 'filter_current_month',
          'TITLE': 'Current month',
          'SORT': '0',
          'FIELDS': [
            {
              'ID': 'field_PERIOD',
              'TYPE': 'DATE',
              'NAME': 'PERIOD',
              'SUB_TYPE': {
                'NAME': 'This month',
                'VALUE': 'CURRENT_MONTH'
              },
              'SUB_TYPES': [
                {
                  'NAME': 'This month',
                  'VALUE': 'CURRENT_MONTH'
                },
                {
                  'NAME': 'Current quarter',
                  'VALUE': 'CURRENT_QUARTER'
                },
                {
                  'NAME': 'Last 7 days',
                  'VALUE': 'LAST_7_DAYS'
                },
                {
                  'NAME': 'Last 30 days',
                  'VALUE': 'LAST_30_DAYS'
                },
                {
                  'NAME': 'Last 60 days',
                  'VALUE': 'LAST_60_DAYS'
                },
                {
                  'NAME': 'Last 90 days',
                  'VALUE': 'LAST_90_DAYS'
                },
                {
                  'NAME': 'Month',
                  'VALUE': 'MONTH'
                },
                {
                  'NAME': 'Quarter',
                  'VALUE': 'QUARTER'
                },
                {
                  'NAME': 'Year',
                  'VALUE': 'YEAR'
                }
              ],
              'MONTH': {
                'VALUE': '6',
                'NAME': 'June'
              },
              'MONTHS': [
                {
                  'VALUE': '1',
                  'NAME': 'January'
                },
                {
                  'VALUE': '2',
                  'NAME': 'February'
                },
                {
                  'VALUE': '3',
                  'NAME': 'March'
                },
                {
                  'VALUE': '4',
                  'NAME': 'April'
                },
                {
                  'VALUE': '5',
                  'NAME': 'May'
                },
                {
                  'VALUE': '6',
                  'NAME': 'June'
                },
                {
                  'VALUE': '7',
                  'NAME': 'July'
                },
                {
                  'VALUE': '8',
                  'NAME': 'August'
                },
                {
                  'VALUE': '9',
                  'NAME': 'September'
                },
                {
                  'VALUE': '10',
                  'NAME': 'October'
                },
                {
                  'VALUE': '11',
                  'NAME': 'November'
                },
                {
                  'VALUE': '12',
                  'NAME': 'December'
                }
              ],
              'QUARTER': {
                'VALUE': '2',
                'NAME': 'II'
              },
              'QUARTERS': [
                {
                  'VALUE': '1',
                  'NAME': 'I'
                },
                {
                  'VALUE': '2',
                  'NAME': 'II'
                },
                {
                  'VALUE': '3',
                  'NAME': 'III'
                },
                {
                  'VALUE': '4',
                  'NAME': 'IV'
                }
              ],
              'YEAR': {
                'NAME': '2021',
                'VALUE': '2021'
              },
              'YEARS': [
                {
                  'NAME': '2026',
                  'VALUE': '2026'
                },
                {
                  'NAME': '2025',
                  'VALUE': '2025'
                },
                {
                  'NAME': '2024',
                  'VALUE': '2024'
                },
                {
                  'NAME': '2023',
                  'VALUE': '2023'
                },
                {
                  'NAME': '2022',
                  'VALUE': '2022'
                },
                {
                  'NAME': '2021',
                  'VALUE': '2021'
                },
                {
                  'NAME': '2020',
                  'VALUE': '2020'
                },
                {
                  'NAME': '2019',
                  'VALUE': '2019'
                },
                {
                  'NAME': '2018',
                  'VALUE': '2018'
                },
                {
                  'NAME': '2017',
                  'VALUE': '2017'
                },
                {
                  'NAME': '2016',
                  'VALUE': '2016'
                },
                {
                  'NAME': '2015',
                  'VALUE': '2015'
                },
                {
                  'NAME': '2014',
                  'VALUE': '2014'
                },
                {
                  'NAME': '2013',
                  'VALUE': '2013'
                },
                {
                  'NAME': '2012',
                  'VALUE': '2012'
                },
                {
                  'NAME': '2011',
                  'VALUE': '2011'
                },
                {
                  'NAME': '2010',
                  'VALUE': '2010'
                },
                {
                  'NAME': '2009',
                  'VALUE': '2009'
                },
                {
                  'NAME': '2008',
                  'VALUE': '2008'
                },
                {
                  'NAME': '2007',
                  'VALUE': '2007'
                },
                {
                  'NAME': '2006',
                  'VALUE': '2006'
                },
                {
                  'NAME': '2005',
                  'VALUE': '2005'
                },
                {
                  'NAME': '2004',
                  'VALUE': '2004'
                },
                {
                  'NAME': '2003',
                  'VALUE': '2003'
                },
                {
                  'NAME': '2002',
                  'VALUE': '2002'
                },
                {
                  'NAME': '2001',
                  'VALUE': '2001'
                }
              ],
              'VALUES': {
                '_allow_year': '',
                '_from': '',
                '_to': '',
                '_days': '',
                '_month': '',
                '_quarter': '',
                '_year': ''
              },
              'PLACEHOLDER': '',
              'LABEL': 'Reporting period',
              'ENABLE_TIME': false,
              'SELECT_PARAMS': {
                'isMulti': false
              },
              'YEARS_SWITCHER': '',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            }
          ],
          'IS_DEFAULT': true,
          'FOR_ALL': true,
          'PINNED': true
        },
        {
          'ID': 'filter_current_quarter',
          'SORT': '0',
          'TITLE': 'Current quarter',
          'FIELDS': [
            {
              'ID': 'field_RESPONSIBLE_ID_lead_widget',
              'TYPE': 'DEST_SELECTOR',
              'NAME': 'RESPONSIBLE_ID',
              'LABEL': 'Responsible person',
              'VALUES': {
                '_label': '',
                '_value': ''
              },
              'MULTIPLE': false,
              'PLACEHOLDER': '',
              'HTML': '<!--\'start_frame_cache_b6FSBG\'--><script src="/bitrix/components/bitrix/main.ui.selector/templates/.default/script.js"></script><script>\n\tBX.ready(function() {\n\n\t\tvar f = function(params) {\n\t\t\tvar selectorId = \'RESPONSIBLE_ID\';\n\t\t\tvar inputId = (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& BX.type.isNotEmptyString(params.inputId)\n\t\t\t\t\t? params.inputId\n\t\t\t\t\t: false);\n\t\t\tvar inputBoxId = false;\n\t\t\tvar inputContainerId = false;\n\t\t\tvar containerId = (typeof params != \'undefined\' && params.containerId != \'undefined\' ? params.containerId : false);\n\t\t\tvar bindId = (containerId ? containerId : inputId);\n\t\t\tvar openDialogWhenInit = (\n\t\t\t\ttypeof params == \'undefined\'\n\t\t\t\t|| typeof params.openDialogWhenInit == \'undefined\'\n\t\t\t\t|| !!params.openDialogWhenInit\n\t\t\t);\n\n\t\t\tvar fieldName = false;\n\n\t\t\tif (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& typeof params.id != \'undefined\'\n\t\t\t\t&& params.id != selectorId\n\t\t\t)\n\t\t\t{\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tBX.Main.SelectorV2.create({\n\t\t\t\tapiVersion: 2,\n\t\t\t\tid: selectorId,\n\t\t\t\tfieldName: fieldName,\n\t\t\t\tpathToAjax: \'/bitrix/components/bitrix/main.ui.selector/ajax.php\',\n\t\t\t\tinputId: inputId,\n\t\t\t\tinputBoxId: inputBoxId,\n\t\t\t\tinputContainerId: inputContainerId,\n\t\t\t\tbindId: bindId,\n\t\t\t\tcontainerId: containerId,\n\t\t\t\ttagId: BX(\'\'),\n\t\t\t\topenDialogWhenInit: openDialogWhenInit,\n\t\t\t\tbindNode: BX(\'\'),\n\t\t\t\toptions: {\'multiple\':false,\'eventInit\':\'BX.Filter.DestinationSelector:openInit\',\'eventOpen\':\'BX.Filter.DestinationSelector:open\',\'context\':\'CRM_WIDGET_FILTER_RESPONSIBLE_ID\',\'popupAutoHide\':\'N\',\'useSearch\':\'N\',\'userNameTemplate\':\'#NAME# #LAST_NAME#\',\'useClientDatabase\':\'Y\',\'enableLast\':\'Y\',\'enableUsers\':\'Y\',\'enableDepartments\':\'Y\',\'allowAddUser\':\'N\',\'allowAddCrmContact\':\'N\',\'allowAddSocNetGroup\':\'N\',\'allowSearchCrmEmailUsers\':\'N\',\'allowSearchNetworkUsers\':\'N\',\'useNewCallback\':\'Y\',\'focusInputOnSelectItem\':\'N\',\'focusInputOnSwitchTab\':\'N\',\'landing\':\'N\',\'contextCode\':\'U\',\'enableAll\':\'N\',\'enableSonetgroups\':\'N\',\'allowEmailInvitation\':\'N\',\'allowSearchEmailUsers\':\'N\',\'departmentSelectDisable\':\'Y\',\'isNumeric\':\'Y\',\'prefix\':\'U\'},\n\t\t\t\tcallback : {\n\t\t\t\t\tselect: BX.Filter.DestinationSelectorManager.onSelect.bind(null, \'Y\', \'U\'),\n\t\t\t\t\tunSelect: null,\n\t\t\t\t\topenDialog: BX.Filter.DestinationSelectorManager.onDialogOpen,\n\t\t\t\t\tcloseDialog: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenSearch: null,\n\t\t\t\t\tcloseSearch: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenEmailAdd: null,\n\t\t\t\t\tcloseEmailAdd: null\t\t\t\t},\n\t\t\t\tcallbackBefore : {\n\t\t\t\t\tselect: null,\n\t\t\t\t\topenDialog: null,\n\t\t\t\t\tcontext: null,\n\t\t\t\t},\n\t\t\t\titems : {\n\t\t\t\t\tselected: [],\n\t\t\t\t\tundeletable: [],\n\t\t\t\t\thidden: []\t\t\t\t},\n\t\t\t\tentities: {\n\t\t\t\t\tusers: \'\',\n\t\t\t\t\tgroups: \'\',\n\t\t\t\t\tsonetgroups: \'\',\n\t\t\t\t\tdepartment: \'\'\t\t\t\t}\n\t\t\t});\n\n\t\t\tBX.removeCustomEvent(window, "BX.Filter.DestinationSelector:openInit", arguments.callee);\n\t\t};\n\n\t\t\t\t\tBX.addCustomEvent(window, "BX.Filter.DestinationSelector:openInit", f);\n\t\t\t\n\t});\n</script>\n\n<!--\'end_frame_cache_b6FSBG\'-->',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            },
            {
              'ID': 'field_PERIOD',
              'TYPE': 'DATE',
              'NAME': 'PERIOD',
              'SUB_TYPE': {
                'NAME': 'Current quarter',
                'VALUE': 'CURRENT_QUARTER'
              },
              'SUB_TYPES': [
                {
                  'NAME': 'This month',
                  'VALUE': 'CURRENT_MONTH'
                },
                {
                  'NAME': 'Current quarter',
                  'VALUE': 'CURRENT_QUARTER'
                },
                {
                  'NAME': 'Last 7 days',
                  'VALUE': 'LAST_7_DAYS'
                },
                {
                  'NAME': 'Last 30 days',
                  'VALUE': 'LAST_30_DAYS'
                },
                {
                  'NAME': 'Last 60 days',
                  'VALUE': 'LAST_60_DAYS'
                },
                {
                  'NAME': 'Last 90 days',
                  'VALUE': 'LAST_90_DAYS'
                },
                {
                  'NAME': 'Month',
                  'VALUE': 'MONTH'
                },
                {
                  'NAME': 'Quarter',
                  'VALUE': 'QUARTER'
                },
                {
                  'NAME': 'Year',
                  'VALUE': 'YEAR'
                }
              ],
              'MONTH': {
                'VALUE': '6',
                'NAME': 'June'
              },
              'MONTHS': [
                {
                  'VALUE': '1',
                  'NAME': 'January'
                },
                {
                  'VALUE': '2',
                  'NAME': 'February'
                },
                {
                  'VALUE': '3',
                  'NAME': 'March'
                },
                {
                  'VALUE': '4',
                  'NAME': 'April'
                },
                {
                  'VALUE': '5',
                  'NAME': 'May'
                },
                {
                  'VALUE': '6',
                  'NAME': 'June'
                },
                {
                  'VALUE': '7',
                  'NAME': 'July'
                },
                {
                  'VALUE': '8',
                  'NAME': 'August'
                },
                {
                  'VALUE': '9',
                  'NAME': 'September'
                },
                {
                  'VALUE': '10',
                  'NAME': 'October'
                },
                {
                  'VALUE': '11',
                  'NAME': 'November'
                },
                {
                  'VALUE': '12',
                  'NAME': 'December'
                }
              ],
              'QUARTER': {
                'VALUE': '2',
                'NAME': 'II'
              },
              'QUARTERS': [
                {
                  'VALUE': '1',
                  'NAME': 'I'
                },
                {
                  'VALUE': '2',
                  'NAME': 'II'
                },
                {
                  'VALUE': '3',
                  'NAME': 'III'
                },
                {
                  'VALUE': '4',
                  'NAME': 'IV'
                }
              ],
              'YEAR': {
                'NAME': '2021',
                'VALUE': '2021'
              },
              'YEARS': [
                {
                  'NAME': '2026',
                  'VALUE': '2026'
                },
                {
                  'NAME': '2025',
                  'VALUE': '2025'
                },
                {
                  'NAME': '2024',
                  'VALUE': '2024'
                },
                {
                  'NAME': '2023',
                  'VALUE': '2023'
                },
                {
                  'NAME': '2022',
                  'VALUE': '2022'
                },
                {
                  'NAME': '2021',
                  'VALUE': '2021'
                },
                {
                  'NAME': '2020',
                  'VALUE': '2020'
                },
                {
                  'NAME': '2019',
                  'VALUE': '2019'
                },
                {
                  'NAME': '2018',
                  'VALUE': '2018'
                },
                {
                  'NAME': '2017',
                  'VALUE': '2017'
                },
                {
                  'NAME': '2016',
                  'VALUE': '2016'
                },
                {
                  'NAME': '2015',
                  'VALUE': '2015'
                },
                {
                  'NAME': '2014',
                  'VALUE': '2014'
                },
                {
                  'NAME': '2013',
                  'VALUE': '2013'
                },
                {
                  'NAME': '2012',
                  'VALUE': '2012'
                },
                {
                  'NAME': '2011',
                  'VALUE': '2011'
                },
                {
                  'NAME': '2010',
                  'VALUE': '2010'
                },
                {
                  'NAME': '2009',
                  'VALUE': '2009'
                },
                {
                  'NAME': '2008',
                  'VALUE': '2008'
                },
                {
                  'NAME': '2007',
                  'VALUE': '2007'
                },
                {
                  'NAME': '2006',
                  'VALUE': '2006'
                },
                {
                  'NAME': '2005',
                  'VALUE': '2005'
                },
                {
                  'NAME': '2004',
                  'VALUE': '2004'
                },
                {
                  'NAME': '2003',
                  'VALUE': '2003'
                },
                {
                  'NAME': '2002',
                  'VALUE': '2002'
                },
                {
                  'NAME': '2001',
                  'VALUE': '2001'
                }
              ],
              'VALUES': {
                '_allow_year': '',
                '_from': '',
                '_to': '',
                '_days': '',
                '_month': '',
                '_quarter': '',
                '_year': ''
              },
              'PLACEHOLDER': '',
              'LABEL': 'Reporting period',
              'ENABLE_TIME': false,
              'SELECT_PARAMS': {
                'isMulti': false
              },
              'YEARS_SWITCHER': '',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            }
          ],
          'FOR_ALL': true,
          'IS_PINNED': false,
          'ADDITIONAL': [
          ]
        },
        {
          'ID': 'tmp_filter',
          'SORT': '1',
          'TITLE': 'Last 30 days',
          'FIELDS': [
            {
              'ID': 'field_RESPONSIBLE_ID_lead_widget',
              'TYPE': 'DEST_SELECTOR',
              'NAME': 'RESPONSIBLE_ID',
              'LABEL': 'Responsible person',
              'VALUES': {
                '_label': '',
                '_value': ''
              },
              'MULTIPLE': false,
              'PLACEHOLDER': '',
              'HTML': '<!--\'start_frame_cache_b6FSBG\'--><script src="/bitrix/components/bitrix/main.ui.selector/templates/.default/script.js"></script><script>\n\tBX.ready(function() {\n\n\t\tvar f = function(params) {\n\t\t\tvar selectorId = \'RESPONSIBLE_ID\';\n\t\t\tvar inputId = (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& BX.type.isNotEmptyString(params.inputId)\n\t\t\t\t\t? params.inputId\n\t\t\t\t\t: false);\n\t\t\tvar inputBoxId = false;\n\t\t\tvar inputContainerId = false;\n\t\t\tvar containerId = (typeof params != \'undefined\' && params.containerId != \'undefined\' ? params.containerId : false);\n\t\t\tvar bindId = (containerId ? containerId : inputId);\n\t\t\tvar openDialogWhenInit = (\n\t\t\t\ttypeof params == \'undefined\'\n\t\t\t\t|| typeof params.openDialogWhenInit == \'undefined\'\n\t\t\t\t|| !!params.openDialogWhenInit\n\t\t\t);\n\n\t\t\tvar fieldName = false;\n\n\t\t\tif (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& typeof params.id != \'undefined\'\n\t\t\t\t&& params.id != selectorId\n\t\t\t)\n\t\t\t{\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tBX.Main.SelectorV2.create({\n\t\t\t\tapiVersion: 2,\n\t\t\t\tid: selectorId,\n\t\t\t\tfieldName: fieldName,\n\t\t\t\tpathToAjax: \'/bitrix/components/bitrix/main.ui.selector/ajax.php\',\n\t\t\t\tinputId: inputId,\n\t\t\t\tinputBoxId: inputBoxId,\n\t\t\t\tinputContainerId: inputContainerId,\n\t\t\t\tbindId: bindId,\n\t\t\t\tcontainerId: containerId,\n\t\t\t\ttagId: BX(\'\'),\n\t\t\t\topenDialogWhenInit: openDialogWhenInit,\n\t\t\t\tbindNode: BX(\'\'),\n\t\t\t\toptions: {\'multiple\':false,\'eventInit\':\'BX.Filter.DestinationSelector:openInit\',\'eventOpen\':\'BX.Filter.DestinationSelector:open\',\'context\':\'CRM_WIDGET_FILTER_RESPONSIBLE_ID\',\'popupAutoHide\':\'N\',\'useSearch\':\'N\',\'userNameTemplate\':\'#NAME# #LAST_NAME#\',\'useClientDatabase\':\'Y\',\'enableLast\':\'Y\',\'enableUsers\':\'Y\',\'enableDepartments\':\'Y\',\'allowAddUser\':\'N\',\'allowAddCrmContact\':\'N\',\'allowAddSocNetGroup\':\'N\',\'allowSearchCrmEmailUsers\':\'N\',\'allowSearchNetworkUsers\':\'N\',\'useNewCallback\':\'Y\',\'focusInputOnSelectItem\':\'N\',\'focusInputOnSwitchTab\':\'N\',\'landing\':\'N\',\'contextCode\':\'U\',\'enableAll\':\'N\',\'enableSonetgroups\':\'N\',\'allowEmailInvitation\':\'N\',\'allowSearchEmailUsers\':\'N\',\'departmentSelectDisable\':\'Y\',\'isNumeric\':\'Y\',\'prefix\':\'U\'},\n\t\t\t\tcallback : {\n\t\t\t\t\tselect: BX.Filter.DestinationSelectorManager.onSelect.bind(null, \'Y\', \'U\'),\n\t\t\t\t\tunSelect: null,\n\t\t\t\t\topenDialog: BX.Filter.DestinationSelectorManager.onDialogOpen,\n\t\t\t\t\tcloseDialog: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenSearch: null,\n\t\t\t\t\tcloseSearch: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenEmailAdd: null,\n\t\t\t\t\tcloseEmailAdd: null\t\t\t\t},\n\t\t\t\tcallbackBefore : {\n\t\t\t\t\tselect: null,\n\t\t\t\t\topenDialog: null,\n\t\t\t\t\tcontext: null,\n\t\t\t\t},\n\t\t\t\titems : {\n\t\t\t\t\tselected: [],\n\t\t\t\t\tundeletable: [],\n\t\t\t\t\thidden: []\t\t\t\t},\n\t\t\t\tentities: {\n\t\t\t\t\tusers: \'\',\n\t\t\t\t\tgroups: \'\',\n\t\t\t\t\tsonetgroups: \'\',\n\t\t\t\t\tdepartment: \'\'\t\t\t\t}\n\t\t\t});\n\n\t\t\tBX.removeCustomEvent(window, "BX.Filter.DestinationSelector:openInit", arguments.callee);\n\t\t};\n\n\t\t\t\t\tBX.addCustomEvent(window, "BX.Filter.DestinationSelector:openInit", f);\n\t\t\t\n\t});\n</script>\n\n<!--\'end_frame_cache_b6FSBG\'-->',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            },
            {
              'ID': 'field_PERIOD',
              'TYPE': 'DATE',
              'NAME': 'PERIOD',
              'SUB_TYPE': {
                'NAME': 'This month',
                'VALUE': 'CURRENT_MONTH'
              },
              'SUB_TYPES': [
                {
                  'NAME': 'This month',
                  'VALUE': 'CURRENT_MONTH'
                },
                {
                  'NAME': 'Current quarter',
                  'VALUE': 'CURRENT_QUARTER'
                },
                {
                  'NAME': 'Last 7 days',
                  'VALUE': 'LAST_7_DAYS'
                },
                {
                  'NAME': 'Last 30 days',
                  'VALUE': 'LAST_30_DAYS'
                },
                {
                  'NAME': 'Last 60 days',
                  'VALUE': 'LAST_60_DAYS'
                },
                {
                  'NAME': 'Last 90 days',
                  'VALUE': 'LAST_90_DAYS'
                },
                {
                  'NAME': 'Month',
                  'VALUE': 'MONTH'
                },
                {
                  'NAME': 'Quarter',
                  'VALUE': 'QUARTER'
                },
                {
                  'NAME': 'Year',
                  'VALUE': 'YEAR'
                }
              ],
              'MONTH': {
                'VALUE': '6',
                'NAME': 'June'
              },
              'MONTHS': [
                {
                  'VALUE': '1',
                  'NAME': 'January'
                },
                {
                  'VALUE': '2',
                  'NAME': 'February'
                },
                {
                  'VALUE': '3',
                  'NAME': 'March'
                },
                {
                  'VALUE': '4',
                  'NAME': 'April'
                },
                {
                  'VALUE': '5',
                  'NAME': 'May'
                },
                {
                  'VALUE': '6',
                  'NAME': 'June'
                },
                {
                  'VALUE': '7',
                  'NAME': 'July'
                },
                {
                  'VALUE': '8',
                  'NAME': 'August'
                },
                {
                  'VALUE': '9',
                  'NAME': 'September'
                },
                {
                  'VALUE': '10',
                  'NAME': 'October'
                },
                {
                  'VALUE': '11',
                  'NAME': 'November'
                },
                {
                  'VALUE': '12',
                  'NAME': 'December'
                }
              ],
              'QUARTER': {
                'VALUE': '2',
                'NAME': 'II'
              },
              'QUARTERS': [
                {
                  'VALUE': '1',
                  'NAME': 'I'
                },
                {
                  'VALUE': '2',
                  'NAME': 'II'
                },
                {
                  'VALUE': '3',
                  'NAME': 'III'
                },
                {
                  'VALUE': '4',
                  'NAME': 'IV'
                }
              ],
              'YEAR': {
                'NAME': '2021',
                'VALUE': '2021'
              },
              'YEARS': [
                {
                  'NAME': '2026',
                  'VALUE': '2026'
                },
                {
                  'NAME': '2025',
                  'VALUE': '2025'
                },
                {
                  'NAME': '2024',
                  'VALUE': '2024'
                },
                {
                  'NAME': '2023',
                  'VALUE': '2023'
                },
                {
                  'NAME': '2022',
                  'VALUE': '2022'
                },
                {
                  'NAME': '2021',
                  'VALUE': '2021'
                },
                {
                  'NAME': '2020',
                  'VALUE': '2020'
                },
                {
                  'NAME': '2019',
                  'VALUE': '2019'
                },
                {
                  'NAME': '2018',
                  'VALUE': '2018'
                },
                {
                  'NAME': '2017',
                  'VALUE': '2017'
                },
                {
                  'NAME': '2016',
                  'VALUE': '2016'
                },
                {
                  'NAME': '2015',
                  'VALUE': '2015'
                },
                {
                  'NAME': '2014',
                  'VALUE': '2014'
                },
                {
                  'NAME': '2013',
                  'VALUE': '2013'
                },
                {
                  'NAME': '2012',
                  'VALUE': '2012'
                },
                {
                  'NAME': '2011',
                  'VALUE': '2011'
                },
                {
                  'NAME': '2010',
                  'VALUE': '2010'
                },
                {
                  'NAME': '2009',
                  'VALUE': '2009'
                },
                {
                  'NAME': '2008',
                  'VALUE': '2008'
                },
                {
                  'NAME': '2007',
                  'VALUE': '2007'
                },
                {
                  'NAME': '2006',
                  'VALUE': '2006'
                },
                {
                  'NAME': '2005',
                  'VALUE': '2005'
                },
                {
                  'NAME': '2004',
                  'VALUE': '2004'
                },
                {
                  'NAME': '2003',
                  'VALUE': '2003'
                },
                {
                  'NAME': '2002',
                  'VALUE': '2002'
                },
                {
                  'NAME': '2001',
                  'VALUE': '2001'
                }
              ],
              'VALUES': {
                '_allow_year': '',
                '_from': '',
                '_to': '',
                '_days': '',
                '_month': '',
                '_quarter': '',
                '_year': ''
              },
              'PLACEHOLDER': '',
              'LABEL': 'Reporting period',
              'ENABLE_TIME': false,
              'SELECT_PARAMS': {
                'isMulti': false
              },
              'YEARS_SWITCHER': '',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            }
          ],
          'FOR_ALL': true,
          'IS_PINNED': false,
          'ADDITIONAL': [
          ],
          'FIELDS_COUNT': '0'
        },
        {
          'ID': 'default_filter',
          'TITLE': 'Filter',
          'SORT': '3',
          'FIELDS': [
            {
              'ID': 'field_RESPONSIBLE_ID_lead_widget',
              'TYPE': 'DEST_SELECTOR',
              'NAME': 'RESPONSIBLE_ID',
              'LABEL': 'Responsible person',
              'VALUES': {
                '_label': '',
                '_value': ''
              },
              'MULTIPLE': false,
              'PLACEHOLDER': '',
              'HTML': '<!--\'start_frame_cache_b6FSBG\'--><script src="/bitrix/components/bitrix/main.ui.selector/templates/.default/script.js"></script><script>\n\tBX.ready(function() {\n\n\t\tvar f = function(params) {\n\t\t\tvar selectorId = \'RESPONSIBLE_ID\';\n\t\t\tvar inputId = (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& BX.type.isNotEmptyString(params.inputId)\n\t\t\t\t\t? params.inputId\n\t\t\t\t\t: false);\n\t\t\tvar inputBoxId = false;\n\t\t\tvar inputContainerId = false;\n\t\t\tvar containerId = (typeof params != \'undefined\' && params.containerId != \'undefined\' ? params.containerId : false);\n\t\t\tvar bindId = (containerId ? containerId : inputId);\n\t\t\tvar openDialogWhenInit = (\n\t\t\t\ttypeof params == \'undefined\'\n\t\t\t\t|| typeof params.openDialogWhenInit == \'undefined\'\n\t\t\t\t|| !!params.openDialogWhenInit\n\t\t\t);\n\n\t\t\tvar fieldName = false;\n\n\t\t\tif (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& typeof params.id != \'undefined\'\n\t\t\t\t&& params.id != selectorId\n\t\t\t)\n\t\t\t{\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tBX.Main.SelectorV2.create({\n\t\t\t\tapiVersion: 2,\n\t\t\t\tid: selectorId,\n\t\t\t\tfieldName: fieldName,\n\t\t\t\tpathToAjax: \'/bitrix/components/bitrix/main.ui.selector/ajax.php\',\n\t\t\t\tinputId: inputId,\n\t\t\t\tinputBoxId: inputBoxId,\n\t\t\t\tinputContainerId: inputContainerId,\n\t\t\t\tbindId: bindId,\n\t\t\t\tcontainerId: containerId,\n\t\t\t\ttagId: BX(\'\'),\n\t\t\t\topenDialogWhenInit: openDialogWhenInit,\n\t\t\t\tbindNode: BX(\'\'),\n\t\t\t\toptions: {\'multiple\':false,\'eventInit\':\'BX.Filter.DestinationSelector:openInit\',\'eventOpen\':\'BX.Filter.DestinationSelector:open\',\'context\':\'CRM_WIDGET_FILTER_RESPONSIBLE_ID\',\'popupAutoHide\':\'N\',\'useSearch\':\'N\',\'userNameTemplate\':\'#NAME# #LAST_NAME#\',\'useClientDatabase\':\'Y\',\'enableLast\':\'Y\',\'enableUsers\':\'Y\',\'enableDepartments\':\'Y\',\'allowAddUser\':\'N\',\'allowAddCrmContact\':\'N\',\'allowAddSocNetGroup\':\'N\',\'allowSearchCrmEmailUsers\':\'N\',\'allowSearchNetworkUsers\':\'N\',\'useNewCallback\':\'Y\',\'focusInputOnSelectItem\':\'N\',\'focusInputOnSwitchTab\':\'N\',\'landing\':\'N\',\'contextCode\':\'U\',\'enableAll\':\'N\',\'enableSonetgroups\':\'N\',\'allowEmailInvitation\':\'N\',\'allowSearchEmailUsers\':\'N\',\'departmentSelectDisable\':\'Y\',\'isNumeric\':\'Y\',\'prefix\':\'U\'},\n\t\t\t\tcallback : {\n\t\t\t\t\tselect: BX.Filter.DestinationSelectorManager.onSelect.bind(null, \'Y\', \'U\'),\n\t\t\t\t\tunSelect: null,\n\t\t\t\t\topenDialog: BX.Filter.DestinationSelectorManager.onDialogOpen,\n\t\t\t\t\tcloseDialog: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenSearch: null,\n\t\t\t\t\tcloseSearch: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenEmailAdd: null,\n\t\t\t\t\tcloseEmailAdd: null\t\t\t\t},\n\t\t\t\tcallbackBefore : {\n\t\t\t\t\tselect: null,\n\t\t\t\t\topenDialog: null,\n\t\t\t\t\tcontext: null,\n\t\t\t\t},\n\t\t\t\titems : {\n\t\t\t\t\tselected: [],\n\t\t\t\t\tundeletable: [],\n\t\t\t\t\thidden: []\t\t\t\t},\n\t\t\t\tentities: {\n\t\t\t\t\tusers: \'\',\n\t\t\t\t\tgroups: \'\',\n\t\t\t\t\tsonetgroups: \'\',\n\t\t\t\t\tdepartment: \'\'\t\t\t\t}\n\t\t\t});\n\n\t\t\tBX.removeCustomEvent(window, "BX.Filter.DestinationSelector:openInit", arguments.callee);\n\t\t};\n\n\t\t\t\t\tBX.addCustomEvent(window, "BX.Filter.DestinationSelector:openInit", f);\n\t\t\t\n\t});\n</script>\n\n<!--\'end_frame_cache_b6FSBG\'-->',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            },
            {
              'ID': 'field_PERIOD',
              'TYPE': 'DATE',
              'NAME': 'PERIOD',
              'SUB_TYPE': {
                'NAME': 'This month',
                'VALUE': 'CURRENT_MONTH'
              },
              'SUB_TYPES': [
                {
                  'NAME': 'This month',
                  'VALUE': 'CURRENT_MONTH'
                },
                {
                  'NAME': 'Current quarter',
                  'VALUE': 'CURRENT_QUARTER'
                },
                {
                  'NAME': 'Last 7 days',
                  'VALUE': 'LAST_7_DAYS'
                },
                {
                  'NAME': 'Last 30 days',
                  'VALUE': 'LAST_30_DAYS'
                },
                {
                  'NAME': 'Last 60 days',
                  'VALUE': 'LAST_60_DAYS'
                },
                {
                  'NAME': 'Last 90 days',
                  'VALUE': 'LAST_90_DAYS'
                },
                {
                  'NAME': 'Month',
                  'VALUE': 'MONTH'
                },
                {
                  'NAME': 'Quarter',
                  'VALUE': 'QUARTER'
                },
                {
                  'NAME': 'Year',
                  'VALUE': 'YEAR'
                }
              ],
              'MONTH': {
                'VALUE': '6',
                'NAME': 'June'
              },
              'MONTHS': [
                {
                  'VALUE': '1',
                  'NAME': 'January'
                },
                {
                  'VALUE': '2',
                  'NAME': 'February'
                },
                {
                  'VALUE': '3',
                  'NAME': 'March'
                },
                {
                  'VALUE': '4',
                  'NAME': 'April'
                },
                {
                  'VALUE': '5',
                  'NAME': 'May'
                },
                {
                  'VALUE': '6',
                  'NAME': 'June'
                },
                {
                  'VALUE': '7',
                  'NAME': 'July'
                },
                {
                  'VALUE': '8',
                  'NAME': 'August'
                },
                {
                  'VALUE': '9',
                  'NAME': 'September'
                },
                {
                  'VALUE': '10',
                  'NAME': 'October'
                },
                {
                  'VALUE': '11',
                  'NAME': 'November'
                },
                {
                  'VALUE': '12',
                  'NAME': 'December'
                }
              ],
              'QUARTER': {
                'VALUE': '2',
                'NAME': 'II'
              },
              'QUARTERS': [
                {
                  'VALUE': '1',
                  'NAME': 'I'
                },
                {
                  'VALUE': '2',
                  'NAME': 'II'
                },
                {
                  'VALUE': '3',
                  'NAME': 'III'
                },
                {
                  'VALUE': '4',
                  'NAME': 'IV'
                }
              ],
              'YEAR': {
                'NAME': '2021',
                'VALUE': '2021'
              },
              'YEARS': [
                {
                  'NAME': '2026',
                  'VALUE': '2026'
                },
                {
                  'NAME': '2025',
                  'VALUE': '2025'
                },
                {
                  'NAME': '2024',
                  'VALUE': '2024'
                },
                {
                  'NAME': '2023',
                  'VALUE': '2023'
                },
                {
                  'NAME': '2022',
                  'VALUE': '2022'
                },
                {
                  'NAME': '2021',
                  'VALUE': '2021'
                },
                {
                  'NAME': '2020',
                  'VALUE': '2020'
                },
                {
                  'NAME': '2019',
                  'VALUE': '2019'
                },
                {
                  'NAME': '2018',
                  'VALUE': '2018'
                },
                {
                  'NAME': '2017',
                  'VALUE': '2017'
                },
                {
                  'NAME': '2016',
                  'VALUE': '2016'
                },
                {
                  'NAME': '2015',
                  'VALUE': '2015'
                },
                {
                  'NAME': '2014',
                  'VALUE': '2014'
                },
                {
                  'NAME': '2013',
                  'VALUE': '2013'
                },
                {
                  'NAME': '2012',
                  'VALUE': '2012'
                },
                {
                  'NAME': '2011',
                  'VALUE': '2011'
                },
                {
                  'NAME': '2010',
                  'VALUE': '2010'
                },
                {
                  'NAME': '2009',
                  'VALUE': '2009'
                },
                {
                  'NAME': '2008',
                  'VALUE': '2008'
                },
                {
                  'NAME': '2007',
                  'VALUE': '2007'
                },
                {
                  'NAME': '2006',
                  'VALUE': '2006'
                },
                {
                  'NAME': '2005',
                  'VALUE': '2005'
                },
                {
                  'NAME': '2004',
                  'VALUE': '2004'
                },
                {
                  'NAME': '2003',
                  'VALUE': '2003'
                },
                {
                  'NAME': '2002',
                  'VALUE': '2002'
                },
                {
                  'NAME': '2001',
                  'VALUE': '2001'
                }
              ],
              'VALUES': {
                '_allow_year': '',
                '_from': '',
                '_to': '',
                '_days': '',
                '_month': '',
                '_quarter': '',
                '_year': ''
              },
              'PLACEHOLDER': '',
              'LABEL': 'Reporting period',
              'ENABLE_TIME': false,
              'SELECT_PARAMS': {
                'isMulti': false
              },
              'YEARS_SWITCHER': '',
              'STRICT': false,
              'REQUIRED': false,
              'VALUE_REQUIRED': false
            }
          ],
          'IS_DEFAULT': true,
          'FOR_ALL': true
        }
      ],
      'TARGET_VIEW_ID': '',
      'TARGET_VIEW_SORT': '500',
      'SETTINGS_URL': '/bitrix/components/bitrix/main.ui.filter/settings.ajax.php',
      'FILTER_ROWS': [
        {
          'ID': 'field_RESPONSIBLE_ID_lead_widget',
          'TYPE': 'DEST_SELECTOR',
          'NAME': 'RESPONSIBLE_ID',
          'LABEL': 'Responsible person',
          'VALUES': {
            '_label': '',
            '_value': ''
          },
          'MULTIPLE': false,
          'PLACEHOLDER': '',
          'HTML': '<!--\'start_frame_cache_b6FSBG\'--><script src="/bitrix/components/bitrix/main.ui.selector/templates/.default/script.js"></script><script>\n\tBX.ready(function() {\n\n\t\tvar f = function(params) {\n\t\t\tvar selectorId = \'RESPONSIBLE_ID\';\n\t\t\tvar inputId = (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& BX.type.isNotEmptyString(params.inputId)\n\t\t\t\t\t? params.inputId\n\t\t\t\t\t: false);\n\t\t\tvar inputBoxId = false;\n\t\t\tvar inputContainerId = false;\n\t\t\tvar containerId = (typeof params != \'undefined\' && params.containerId != \'undefined\' ? params.containerId : false);\n\t\t\tvar bindId = (containerId ? containerId : inputId);\n\t\t\tvar openDialogWhenInit = (\n\t\t\t\ttypeof params == \'undefined\'\n\t\t\t\t|| typeof params.openDialogWhenInit == \'undefined\'\n\t\t\t\t|| !!params.openDialogWhenInit\n\t\t\t);\n\n\t\t\tvar fieldName = false;\n\n\t\t\tif (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& typeof params.id != \'undefined\'\n\t\t\t\t&& params.id != selectorId\n\t\t\t)\n\t\t\t{\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tBX.Main.SelectorV2.create({\n\t\t\t\tapiVersion: 2,\n\t\t\t\tid: selectorId,\n\t\t\t\tfieldName: fieldName,\n\t\t\t\tpathToAjax: \'/bitrix/components/bitrix/main.ui.selector/ajax.php\',\n\t\t\t\tinputId: inputId,\n\t\t\t\tinputBoxId: inputBoxId,\n\t\t\t\tinputContainerId: inputContainerId,\n\t\t\t\tbindId: bindId,\n\t\t\t\tcontainerId: containerId,\n\t\t\t\ttagId: BX(\'\'),\n\t\t\t\topenDialogWhenInit: openDialogWhenInit,\n\t\t\t\tbindNode: BX(\'\'),\n\t\t\t\toptions: {\'multiple\':false,\'eventInit\':\'BX.Filter.DestinationSelector:openInit\',\'eventOpen\':\'BX.Filter.DestinationSelector:open\',\'context\':\'CRM_WIDGET_FILTER_RESPONSIBLE_ID\',\'popupAutoHide\':\'N\',\'useSearch\':\'N\',\'userNameTemplate\':\'#NAME# #LAST_NAME#\',\'useClientDatabase\':\'Y\',\'enableLast\':\'Y\',\'enableUsers\':\'Y\',\'enableDepartments\':\'Y\',\'allowAddUser\':\'N\',\'allowAddCrmContact\':\'N\',\'allowAddSocNetGroup\':\'N\',\'allowSearchCrmEmailUsers\':\'N\',\'allowSearchNetworkUsers\':\'N\',\'useNewCallback\':\'Y\',\'focusInputOnSelectItem\':\'N\',\'focusInputOnSwitchTab\':\'N\',\'landing\':\'N\',\'contextCode\':\'U\',\'enableAll\':\'N\',\'enableSonetgroups\':\'N\',\'allowEmailInvitation\':\'N\',\'allowSearchEmailUsers\':\'N\',\'departmentSelectDisable\':\'Y\',\'isNumeric\':\'Y\',\'prefix\':\'U\'},\n\t\t\t\tcallback : {\n\t\t\t\t\tselect: BX.Filter.DestinationSelectorManager.onSelect.bind(null, \'Y\', \'U\'),\n\t\t\t\t\tunSelect: null,\n\t\t\t\t\topenDialog: BX.Filter.DestinationSelectorManager.onDialogOpen,\n\t\t\t\t\tcloseDialog: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenSearch: null,\n\t\t\t\t\tcloseSearch: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenEmailAdd: null,\n\t\t\t\t\tcloseEmailAdd: null\t\t\t\t},\n\t\t\t\tcallbackBefore : {\n\t\t\t\t\tselect: null,\n\t\t\t\t\topenDialog: null,\n\t\t\t\t\tcontext: null,\n\t\t\t\t},\n\t\t\t\titems : {\n\t\t\t\t\tselected: [],\n\t\t\t\t\tundeletable: [],\n\t\t\t\t\thidden: []\t\t\t\t},\n\t\t\t\tentities: {\n\t\t\t\t\tusers: \'\',\n\t\t\t\t\tgroups: \'\',\n\t\t\t\t\tsonetgroups: \'\',\n\t\t\t\t\tdepartment: \'\'\t\t\t\t}\n\t\t\t});\n\n\t\t\tBX.removeCustomEvent(window, "BX.Filter.DestinationSelector:openInit", arguments.callee);\n\t\t};\n\n\t\t\t\t\tBX.addCustomEvent(window, "BX.Filter.DestinationSelector:openInit", f);\n\t\t\t\n\t});\n</script>\n\n<!--\'end_frame_cache_b6FSBG\'-->',
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        },
        {
          'ID': 'field_PERIOD',
          'TYPE': 'DATE',
          'NAME': 'PERIOD',
          'SUB_TYPE': [
          ],
          'SUB_TYPES': [
            {
              'NAME': 'This month',
              'VALUE': 'CURRENT_MONTH'
            },
            {
              'NAME': 'Current quarter',
              'VALUE': 'CURRENT_QUARTER'
            },
            {
              'NAME': 'Last 7 days',
              'VALUE': 'LAST_7_DAYS'
            },
            {
              'NAME': 'Last 30 days',
              'VALUE': 'LAST_30_DAYS'
            },
            {
              'NAME': 'Last 60 days',
              'VALUE': 'LAST_60_DAYS'
            },
            {
              'NAME': 'Last 90 days',
              'VALUE': 'LAST_90_DAYS'
            },
            {
              'NAME': 'Month',
              'VALUE': 'MONTH'
            },
            {
              'NAME': 'Quarter',
              'VALUE': 'QUARTER'
            },
            {
              'NAME': 'Year',
              'VALUE': 'YEAR'
            }
          ],
          'MONTH': {
            'VALUE': '6',
            'NAME': 'June'
          },
          'MONTHS': [
            {
              'VALUE': '1',
              'NAME': 'January'
            },
            {
              'VALUE': '2',
              'NAME': 'February'
            },
            {
              'VALUE': '3',
              'NAME': 'March'
            },
            {
              'VALUE': '4',
              'NAME': 'April'
            },
            {
              'VALUE': '5',
              'NAME': 'May'
            },
            {
              'VALUE': '6',
              'NAME': 'June'
            },
            {
              'VALUE': '7',
              'NAME': 'July'
            },
            {
              'VALUE': '8',
              'NAME': 'August'
            },
            {
              'VALUE': '9',
              'NAME': 'September'
            },
            {
              'VALUE': '10',
              'NAME': 'October'
            },
            {
              'VALUE': '11',
              'NAME': 'November'
            },
            {
              'VALUE': '12',
              'NAME': 'December'
            }
          ],
          'QUARTER': {
            'VALUE': '2',
            'NAME': 'II'
          },
          'QUARTERS': [
            {
              'VALUE': '1',
              'NAME': 'I'
            },
            {
              'VALUE': '2',
              'NAME': 'II'
            },
            {
              'VALUE': '3',
              'NAME': 'III'
            },
            {
              'VALUE': '4',
              'NAME': 'IV'
            }
          ],
          'YEAR': {
            'NAME': '2021',
            'VALUE': '2021'
          },
          'YEARS': [
            {
              'NAME': '2026',
              'VALUE': '2026'
            },
            {
              'NAME': '2025',
              'VALUE': '2025'
            },
            {
              'NAME': '2024',
              'VALUE': '2024'
            },
            {
              'NAME': '2023',
              'VALUE': '2023'
            },
            {
              'NAME': '2022',
              'VALUE': '2022'
            },
            {
              'NAME': '2021',
              'VALUE': '2021'
            },
            {
              'NAME': '2020',
              'VALUE': '2020'
            },
            {
              'NAME': '2019',
              'VALUE': '2019'
            },
            {
              'NAME': '2018',
              'VALUE': '2018'
            },
            {
              'NAME': '2017',
              'VALUE': '2017'
            },
            {
              'NAME': '2016',
              'VALUE': '2016'
            },
            {
              'NAME': '2015',
              'VALUE': '2015'
            },
            {
              'NAME': '2014',
              'VALUE': '2014'
            },
            {
              'NAME': '2013',
              'VALUE': '2013'
            },
            {
              'NAME': '2012',
              'VALUE': '2012'
            },
            {
              'NAME': '2011',
              'VALUE': '2011'
            },
            {
              'NAME': '2010',
              'VALUE': '2010'
            },
            {
              'NAME': '2009',
              'VALUE': '2009'
            },
            {
              'NAME': '2008',
              'VALUE': '2008'
            },
            {
              'NAME': '2007',
              'VALUE': '2007'
            },
            {
              'NAME': '2006',
              'VALUE': '2006'
            },
            {
              'NAME': '2005',
              'VALUE': '2005'
            },
            {
              'NAME': '2004',
              'VALUE': '2004'
            },
            {
              'NAME': '2003',
              'VALUE': '2003'
            },
            {
              'NAME': '2002',
              'VALUE': '2002'
            },
            {
              'NAME': '2001',
              'VALUE': '2001'
            }
          ],
          'VALUES': {
            '_allow_year': '',
            '_from': '',
            '_to': '',
            '_days': '',
            '_month': '',
            '_quarter': '',
            '_year': ''
          },
          'PLACEHOLDER': '',
          'LABEL': 'Reporting period',
          'ENABLE_TIME': false,
          'SELECT_PARAMS': {
            'isMulti': false
          },
          'YEARS_SWITCHER': '',
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        }
      ],
      'CURRENT_PRESET': {
        'ID': 'default_filter',
        'TITLE': 'Filter',
        'FIELDS': [
          {
            'ID': 'field_RESPONSIBLE_ID_lead_widget',
            'TYPE': 'DEST_SELECTOR',
            'NAME': 'RESPONSIBLE_ID',
            'LABEL': 'Responsible person',
            'VALUES': {
              '_label': '',
              '_value': ''
            },
            'MULTIPLE': false,
            'PLACEHOLDER': '',
            'HTML': '<!--\'start_frame_cache_b6FSBG\'--><script src="/bitrix/components/bitrix/main.ui.selector/templates/.default/script.js"></script><script>\n\tBX.ready(function() {\n\n\t\tvar f = function(params) {\n\t\t\tvar selectorId = \'RESPONSIBLE_ID\';\n\t\t\tvar inputId = (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& BX.type.isNotEmptyString(params.inputId)\n\t\t\t\t\t? params.inputId\n\t\t\t\t\t: false);\n\t\t\tvar inputBoxId = false;\n\t\t\tvar inputContainerId = false;\n\t\t\tvar containerId = (typeof params != \'undefined\' && params.containerId != \'undefined\' ? params.containerId : false);\n\t\t\tvar bindId = (containerId ? containerId : inputId);\n\t\t\tvar openDialogWhenInit = (\n\t\t\t\ttypeof params == \'undefined\'\n\t\t\t\t|| typeof params.openDialogWhenInit == \'undefined\'\n\t\t\t\t|| !!params.openDialogWhenInit\n\t\t\t);\n\n\t\t\tvar fieldName = false;\n\n\t\t\tif (\n\t\t\t\tBX.type.isNotEmptyObject(params)\n\t\t\t\t&& typeof params.id != \'undefined\'\n\t\t\t\t&& params.id != selectorId\n\t\t\t)\n\t\t\t{\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tBX.Main.SelectorV2.create({\n\t\t\t\tapiVersion: 2,\n\t\t\t\tid: selectorId,\n\t\t\t\tfieldName: fieldName,\n\t\t\t\tpathToAjax: \'/bitrix/components/bitrix/main.ui.selector/ajax.php\',\n\t\t\t\tinputId: inputId,\n\t\t\t\tinputBoxId: inputBoxId,\n\t\t\t\tinputContainerId: inputContainerId,\n\t\t\t\tbindId: bindId,\n\t\t\t\tcontainerId: containerId,\n\t\t\t\ttagId: BX(\'\'),\n\t\t\t\topenDialogWhenInit: openDialogWhenInit,\n\t\t\t\tbindNode: BX(\'\'),\n\t\t\t\toptions: {\'multiple\':false,\'eventInit\':\'BX.Filter.DestinationSelector:openInit\',\'eventOpen\':\'BX.Filter.DestinationSelector:open\',\'context\':\'CRM_WIDGET_FILTER_RESPONSIBLE_ID\',\'popupAutoHide\':\'N\',\'useSearch\':\'N\',\'userNameTemplate\':\'#NAME# #LAST_NAME#\',\'useClientDatabase\':\'Y\',\'enableLast\':\'Y\',\'enableUsers\':\'Y\',\'enableDepartments\':\'Y\',\'allowAddUser\':\'N\',\'allowAddCrmContact\':\'N\',\'allowAddSocNetGroup\':\'N\',\'allowSearchCrmEmailUsers\':\'N\',\'allowSearchNetworkUsers\':\'N\',\'useNewCallback\':\'Y\',\'focusInputOnSelectItem\':\'N\',\'focusInputOnSwitchTab\':\'N\',\'landing\':\'N\',\'contextCode\':\'U\',\'enableAll\':\'N\',\'enableSonetgroups\':\'N\',\'allowEmailInvitation\':\'N\',\'allowSearchEmailUsers\':\'N\',\'departmentSelectDisable\':\'Y\',\'isNumeric\':\'Y\',\'prefix\':\'U\'},\n\t\t\t\tcallback : {\n\t\t\t\t\tselect: BX.Filter.DestinationSelectorManager.onSelect.bind(null, \'Y\', \'U\'),\n\t\t\t\t\tunSelect: null,\n\t\t\t\t\topenDialog: BX.Filter.DestinationSelectorManager.onDialogOpen,\n\t\t\t\t\tcloseDialog: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenSearch: null,\n\t\t\t\t\tcloseSearch: BX.Filter.DestinationSelectorManager.onDialogClose,\n\t\t\t\t\topenEmailAdd: null,\n\t\t\t\t\tcloseEmailAdd: null\t\t\t\t},\n\t\t\t\tcallbackBefore : {\n\t\t\t\t\tselect: null,\n\t\t\t\t\topenDialog: null,\n\t\t\t\t\tcontext: null,\n\t\t\t\t},\n\t\t\t\titems : {\n\t\t\t\t\tselected: [],\n\t\t\t\t\tundeletable: [],\n\t\t\t\t\thidden: []\t\t\t\t},\n\t\t\t\tentities: {\n\t\t\t\t\tusers: \'\',\n\t\t\t\t\tgroups: \'\',\n\t\t\t\t\tsonetgroups: \'\',\n\t\t\t\t\tdepartment: \'\'\t\t\t\t}\n\t\t\t});\n\n\t\t\tBX.removeCustomEvent(window, "BX.Filter.DestinationSelector:openInit", arguments.callee);\n\t\t};\n\n\t\t\t\t\tBX.addCustomEvent(window, "BX.Filter.DestinationSelector:openInit", f);\n\t\t\t\n\t});\n</script>\n\n<!--\'end_frame_cache_b6FSBG\'-->',
            'STRICT': false,
            'REQUIRED': false,
            'VALUE_REQUIRED': false
          },
          {
            'ID': 'field_PERIOD',
            'TYPE': 'DATE',
            'NAME': 'PERIOD',
            'SUB_TYPE': [
            ],
            'SUB_TYPES': [
              {
                'NAME': 'This month',
                'VALUE': 'CURRENT_MONTH'
              },
              {
                'NAME': 'Current quarter',
                'VALUE': 'CURRENT_QUARTER'
              },
              {
                'NAME': 'Last 7 days',
                'VALUE': 'LAST_7_DAYS'
              },
              {
                'NAME': 'Last 30 days',
                'VALUE': 'LAST_30_DAYS'
              },
              {
                'NAME': 'Last 60 days',
                'VALUE': 'LAST_60_DAYS'
              },
              {
                'NAME': 'Last 90 days',
                'VALUE': 'LAST_90_DAYS'
              },
              {
                'NAME': 'Month',
                'VALUE': 'MONTH'
              },
              {
                'NAME': 'Quarter',
                'VALUE': 'QUARTER'
              },
              {
                'NAME': 'Year',
                'VALUE': 'YEAR'
              }
            ],
            'MONTH': {
              'VALUE': '6',
              'NAME': 'June'
            },
            'MONTHS': [
              {
                'VALUE': '1',
                'NAME': 'January'
              },
              {
                'VALUE': '2',
                'NAME': 'February'
              },
              {
                'VALUE': '3',
                'NAME': 'March'
              },
              {
                'VALUE': '4',
                'NAME': 'April'
              },
              {
                'VALUE': '5',
                'NAME': 'May'
              },
              {
                'VALUE': '6',
                'NAME': 'June'
              },
              {
                'VALUE': '7',
                'NAME': 'July'
              },
              {
                'VALUE': '8',
                'NAME': 'August'
              },
              {
                'VALUE': '9',
                'NAME': 'September'
              },
              {
                'VALUE': '10',
                'NAME': 'October'
              },
              {
                'VALUE': '11',
                'NAME': 'November'
              },
              {
                'VALUE': '12',
                'NAME': 'December'
              }
            ],
            'QUARTER': {
              'VALUE': '2',
              'NAME': 'II'
            },
            'QUARTERS': [
              {
                'VALUE': '1',
                'NAME': 'I'
              },
              {
                'VALUE': '2',
                'NAME': 'II'
              },
              {
                'VALUE': '3',
                'NAME': 'III'
              },
              {
                'VALUE': '4',
                'NAME': 'IV'
              }
            ],
            'YEAR': {
              'NAME': '2021',
              'VALUE': '2021'
            },
            'YEARS': [
              {
                'NAME': '2026',
                'VALUE': '2026'
              },
              {
                'NAME': '2025',
                'VALUE': '2025'
              },
              {
                'NAME': '2024',
                'VALUE': '2024'
              },
              {
                'NAME': '2023',
                'VALUE': '2023'
              },
              {
                'NAME': '2022',
                'VALUE': '2022'
              },
              {
                'NAME': '2021',
                'VALUE': '2021'
              },
              {
                'NAME': '2020',
                'VALUE': '2020'
              },
              {
                'NAME': '2019',
                'VALUE': '2019'
              },
              {
                'NAME': '2018',
                'VALUE': '2018'
              },
              {
                'NAME': '2017',
                'VALUE': '2017'
              },
              {
                'NAME': '2016',
                'VALUE': '2016'
              },
              {
                'NAME': '2015',
                'VALUE': '2015'
              },
              {
                'NAME': '2014',
                'VALUE': '2014'
              },
              {
                'NAME': '2013',
                'VALUE': '2013'
              },
              {
                'NAME': '2012',
                'VALUE': '2012'
              },
              {
                'NAME': '2011',
                'VALUE': '2011'
              },
              {
                'NAME': '2010',
                'VALUE': '2010'
              },
              {
                'NAME': '2009',
                'VALUE': '2009'
              },
              {
                'NAME': '2008',
                'VALUE': '2008'
              },
              {
                'NAME': '2007',
                'VALUE': '2007'
              },
              {
                'NAME': '2006',
                'VALUE': '2006'
              },
              {
                'NAME': '2005',
                'VALUE': '2005'
              },
              {
                'NAME': '2004',
                'VALUE': '2004'
              },
              {
                'NAME': '2003',
                'VALUE': '2003'
              },
              {
                'NAME': '2002',
                'VALUE': '2002'
              },
              {
                'NAME': '2001',
                'VALUE': '2001'
              }
            ],
            'VALUES': {
              '_allow_year': '',
              '_from': '',
              '_to': '',
              '_days': '',
              '_month': '',
              '_quarter': '',
              '_year': ''
            },
            'PLACEHOLDER': '',
            'LABEL': 'Reporting period',
            'ENABLE_TIME': false,
            'SELECT_PARAMS': {
              'isMulti': false
            },
            'YEARS_SWITCHER': '',
            'STRICT': false,
            'REQUIRED': false,
            'VALUE_REQUIRED': false
          }
        ],
        'FIELDS_COUNT': '0',
        'FOR_ALL': true
      },
      'ENABLE_LABEL': true,
      'ENABLE_LIVE_SEARCH': false,
      'DISABLE_SEARCH': true,
      'COMPACT_STATE': false,
      'LIMITS': {
        'TITLE': '',
        'DESCRIPTION': '',
        'BUTTONS': [
        ]
      },
      'LIMITS_ENABLED': false,
      'MAIN_UI_FILTER__AND': 'and',
      'MAIN_UI_FILTER__MORE': 'more',
      'MAIN_UI_FILTER__BEFORE': 'Before',
      'MAIN_UI_FILTER__AFTER': 'After',
      'MAIN_UI_FILTER__NUMBER_MORE': 'More than',
      'MAIN_UI_FILTER__NUMBER_LESS': 'Less than',
      'MAIN_UI_FILTER__PLACEHOLDER_DEFAULT': 'Filter and search',
      'MAIN_UI_FILTER__PLACEHOLDER_WITH_FILTER': 'search',
      'MAIN_UI_FILTER__PLACEHOLDER': 'Filter',
      'MAIN_UI_FILTER__PLACEHOLDER_LIMITS_EXCEEDED': 'Limit reached, click for details',
      'MAIN_UI_FILTER__QUARTER': 'Quarter',
      'MAIN_UI_FILTER__IS_SET_AS_DEFAULT_PRESET': 'Default filter',
      'MAIN_UI_FILTER__SET_AS_DEFAULT_PRESET': 'Set as default filter',
      'MAIN_UI_FILTER__EDIT_PRESET_TITLE': 'Edit filter name',
      'MAIN_UI_FILTER__REMOVE_PRESET': 'Delete filter',
      'MAIN_UI_FILTER__DRAG_TITLE': 'Pull to sort the filters list',
      'MAIN_UI_FILTER__DRAG_FIELD_TITLE': 'Pull to sort the fields list',
      'MAIN_UI_FILTER__REMOVE_FIELD': 'Hide field',
      'MAIN_UI_FILTER__CONFIRM_MESSAGE_FOR_ALL': 'This action will update filter preferences for all users. <br>Existing saved filters and fields will be changed as well.',
      'MAIN_UI_FILTER__CONFIRM_APPLY_FOR_ALL': 'Set for all',
      'MAIN_UI_FILTER__DATE_NEXT_DAYS_LABEL': 'Next #N# (day/days)',
      'MAIN_UI_FILTER__DATE_PREV_DAYS_LABEL': 'Last #N# (day/days)',
      'MAIN_UI_FILTER__DATE_ERROR_TITLE': 'This field will not be used in filter.',
      'MAIN_UI_FILTER__DATE_ERROR_LABEL': 'Use this format to enter the date',
      'MAIN_UI_FILTER__VALUE_REQUIRED': 'This field is required',
      'CLEAR_GET': false,
      'VALUE_REQUIRED_MODE': false,
      'THEME': 'DEFAULT',
      'RESET_TO_DEFAULT_MODE': true,
      'COMMON_PRESETS_ID': 'lead_widget_presets',
      'IS_AUTHORIZED': true,
      'LAZY_LOAD': '',
      'VALUE_REQUIRED': '',
      'FIELDS_STUBS': [
        {
          'ID': 'field_string',
          'TYPE': 'STRING',
          'NAME': 'string',
          'VALUE': '',
          'LABEL': 'string',
          'PLACEHOLDER': '',
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        },
        {
          'ID': 'field_list',
          'TYPE': 'SELECT',
          'NAME': 'list',
          'VALUE': {
            'NAME': 'Not specified',
            'VALUE': ''
          },
          'PLACEHOLDER': '',
          'LABEL': 'list',
          'ITEMS': [
            {
              'NAME': 'Not specified'
            }
          ],
          'PARAMS': {
            'isMulti': false
          },
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        },
        {
          'ID': 'field_date',
          'TYPE': 'DATE',
          'NAME': 'date',
          'SUB_TYPE': {
            'NAME': 'Any date',
            'VALUE': 'NONE'
          },
          'SUB_TYPES': [
            {
              'NAME': 'Any date',
              'VALUE': 'NONE'
            },
            {
              'NAME': 'Yesterday',
              'VALUE': 'YESTERDAY'
            },
            {
              'NAME': 'Current day',
              'VALUE': 'CURRENT_DAY'
            },
            {
              'NAME': 'Tomorrow',
              'VALUE': 'TOMORROW'
            },
            {
              'NAME': 'This week',
              'VALUE': 'CURRENT_WEEK'
            },
            {
              'NAME': 'This month',
              'VALUE': 'CURRENT_MONTH'
            },
            {
              'NAME': 'Current quarter',
              'VALUE': 'CURRENT_QUARTER'
            },
            {
              'NAME': 'Last 7 days',
              'VALUE': 'LAST_7_DAYS'
            },
            {
              'NAME': 'Last 30 days',
              'VALUE': 'LAST_30_DAYS'
            },
            {
              'NAME': 'Last 60 days',
              'VALUE': 'LAST_60_DAYS'
            },
            {
              'NAME': 'Last 90 days',
              'VALUE': 'LAST_90_DAYS'
            },
            {
              'NAME': 'Last N days',
              'VALUE': 'PREV_DAYS'
            },
            {
              'NAME': 'Next N days',
              'VALUE': 'NEXT_DAYS'
            },
            {
              'NAME': 'Month',
              'VALUE': 'MONTH'
            },
            {
              'NAME': 'Quarter',
              'VALUE': 'QUARTER'
            },
            {
              'NAME': 'Year',
              'VALUE': 'YEAR'
            },
            {
              'NAME': 'Exact date',
              'VALUE': 'EXACT'
            },
            {
              'NAME': 'Last week',
              'VALUE': 'LAST_WEEK'
            },
            {
              'NAME': 'Last month',
              'VALUE': 'LAST_MONTH'
            },
            {
              'NAME': 'Custom range',
              'VALUE': 'RANGE'
            },
            {
              'NAME': 'Next week',
              'VALUE': 'NEXT_WEEK'
            },
            {
              'NAME': 'Next month',
              'VALUE': 'NEXT_MONTH'
            }
          ],
          'MONTH': {
            'VALUE': '6',
            'NAME': 'June'
          },
          'MONTHS': [
            {
              'VALUE': '1',
              'NAME': 'January'
            },
            {
              'VALUE': '2',
              'NAME': 'February'
            },
            {
              'VALUE': '3',
              'NAME': 'March'
            },
            {
              'VALUE': '4',
              'NAME': 'April'
            },
            {
              'VALUE': '5',
              'NAME': 'May'
            },
            {
              'VALUE': '6',
              'NAME': 'June'
            },
            {
              'VALUE': '7',
              'NAME': 'July'
            },
            {
              'VALUE': '8',
              'NAME': 'August'
            },
            {
              'VALUE': '9',
              'NAME': 'September'
            },
            {
              'VALUE': '10',
              'NAME': 'October'
            },
            {
              'VALUE': '11',
              'NAME': 'November'
            },
            {
              'VALUE': '12',
              'NAME': 'December'
            }
          ],
          'QUARTER': {
            'VALUE': '2',
            'NAME': 'II'
          },
          'QUARTERS': [
            {
              'VALUE': '1',
              'NAME': 'I'
            },
            {
              'VALUE': '2',
              'NAME': 'II'
            },
            {
              'VALUE': '3',
              'NAME': 'III'
            },
            {
              'VALUE': '4',
              'NAME': 'IV'
            }
          ],
          'YEAR': {
            'NAME': '2021',
            'VALUE': '2021'
          },
          'YEARS': [
            {
              'NAME': '2026',
              'VALUE': '2026'
            },
            {
              'NAME': '2025',
              'VALUE': '2025'
            },
            {
              'NAME': '2024',
              'VALUE': '2024'
            },
            {
              'NAME': '2023',
              'VALUE': '2023'
            },
            {
              'NAME': '2022',
              'VALUE': '2022'
            },
            {
              'NAME': '2021',
              'VALUE': '2021'
            },
            {
              'NAME': '2020',
              'VALUE': '2020'
            },
            {
              'NAME': '2019',
              'VALUE': '2019'
            },
            {
              'NAME': '2018',
              'VALUE': '2018'
            },
            {
              'NAME': '2017',
              'VALUE': '2017'
            },
            {
              'NAME': '2016',
              'VALUE': '2016'
            },
            {
              'NAME': '2015',
              'VALUE': '2015'
            },
            {
              'NAME': '2014',
              'VALUE': '2014'
            },
            {
              'NAME': '2013',
              'VALUE': '2013'
            },
            {
              'NAME': '2012',
              'VALUE': '2012'
            },
            {
              'NAME': '2011',
              'VALUE': '2011'
            },
            {
              'NAME': '2010',
              'VALUE': '2010'
            },
            {
              'NAME': '2009',
              'VALUE': '2009'
            },
            {
              'NAME': '2008',
              'VALUE': '2008'
            },
            {
              'NAME': '2007',
              'VALUE': '2007'
            },
            {
              'NAME': '2006',
              'VALUE': '2006'
            },
            {
              'NAME': '2005',
              'VALUE': '2005'
            },
            {
              'NAME': '2004',
              'VALUE': '2004'
            },
            {
              'NAME': '2003',
              'VALUE': '2003'
            },
            {
              'NAME': '2002',
              'VALUE': '2002'
            },
            {
              'NAME': '2001',
              'VALUE': '2001'
            }
          ],
          'VALUES': {
            '_allow_year': '',
            '_from': '',
            '_to': '',
            '_days': '',
            '_month': '',
            '_quarter': '',
            '_year': ''
          },
          'PLACEHOLDER': '',
          'LABEL': 'date',
          'ENABLE_TIME': false,
          'SELECT_PARAMS': {
            'isMulti': false
          },
          'YEARS_SWITCHER': '',
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        },
        {
          'ID': 'field_custom_date',
          'TYPE': 'CUSTOM_DATE',
          'NAME': 'custom_date',
          'VALUE': {
            'days': [
            ],
            'months': [
            ],
            'years': [
            ]
          },
          'LABEL': 'custom_date',
          'DAYS': [
            {
              'NAME': 'Today',
              'VALUE': '8'
            },
            {
              'NAME': 'Yesterday',
              'VALUE': '7'
            },
            {
              'NAME': 'Tomorrow',
              'VALUE': '9'
            },
            {
              'SEPARATOR': true
            },
            {
              'VALUE': '1',
              'NAME': '1'
            },
            {
              'VALUE': '2',
              'NAME': '2'
            },
            {
              'VALUE': '3',
              'NAME': '3'
            },
            {
              'VALUE': '4',
              'NAME': '4'
            },
            {
              'VALUE': '5',
              'NAME': '5'
            },
            {
              'VALUE': '6',
              'NAME': '6'
            },
            {
              'VALUE': '7',
              'NAME': '7'
            },
            {
              'VALUE': '8',
              'NAME': '8'
            },
            {
              'VALUE': '9',
              'NAME': '9'
            },
            {
              'VALUE': '10',
              'NAME': '10'
            },
            {
              'VALUE': '11',
              'NAME': '11'
            },
            {
              'VALUE': '12',
              'NAME': '12'
            },
            {
              'VALUE': '13',
              'NAME': '13'
            },
            {
              'VALUE': '14',
              'NAME': '14'
            },
            {
              'VALUE': '15',
              'NAME': '15'
            },
            {
              'VALUE': '16',
              'NAME': '16'
            },
            {
              'VALUE': '17',
              'NAME': '17'
            },
            {
              'VALUE': '18',
              'NAME': '18'
            },
            {
              'VALUE': '19',
              'NAME': '19'
            },
            {
              'VALUE': '20',
              'NAME': '20'
            },
            {
              'VALUE': '21',
              'NAME': '21'
            },
            {
              'VALUE': '22',
              'NAME': '22'
            },
            {
              'VALUE': '23',
              'NAME': '23'
            },
            {
              'VALUE': '24',
              'NAME': '24'
            },
            {
              'VALUE': '25',
              'NAME': '25'
            },
            {
              'VALUE': '26',
              'NAME': '26'
            },
            {
              'VALUE': '27',
              'NAME': '27'
            },
            {
              'VALUE': '28',
              'NAME': '28'
            },
            {
              'VALUE': '29',
              'NAME': '29'
            },
            {
              'VALUE': '30',
              'NAME': '30'
            },
            {
              'VALUE': '31',
              'NAME': '31'
            }
          ],
          'MONTHS': [
            {
              'NAME': 'Current month',
              'VALUE': '6'
            },
            {
              'NAME': 'Last month',
              'VALUE': '5'
            },
            {
              'NAME': 'Next month',
              'VALUE': '7'
            },
            {
              'SEPARATOR': true
            },
            {
              'VALUE': '1',
              'NAME': 'January'
            },
            {
              'VALUE': '2',
              'NAME': 'February'
            },
            {
              'VALUE': '3',
              'NAME': 'March'
            },
            {
              'VALUE': '4',
              'NAME': 'April'
            },
            {
              'VALUE': '5',
              'NAME': 'May'
            },
            {
              'VALUE': '6',
              'NAME': 'June'
            },
            {
              'VALUE': '7',
              'NAME': 'July'
            },
            {
              'VALUE': '8',
              'NAME': 'August'
            },
            {
              'VALUE': '9',
              'NAME': 'September'
            },
            {
              'VALUE': '10',
              'NAME': 'October'
            },
            {
              'VALUE': '11',
              'NAME': 'November'
            },
            {
              'VALUE': '12',
              'NAME': 'December'
            }
          ],
          'YEARS': [
            {
              'NAME': 'Current year',
              'VALUE': '2021'
            },
            {
              'NAME': 'Last year',
              'VALUE': '2020'
            },
            {
              'NAME': 'Next year',
              'VALUE': '2022'
            },
            {
              'SEPARATOR': true
            },
            {
              'NAME': '2026',
              'VALUE': '2026'
            },
            {
              'NAME': '2025',
              'VALUE': '2025'
            },
            {
              'NAME': '2024',
              'VALUE': '2024'
            },
            {
              'NAME': '2023',
              'VALUE': '2023'
            },
            {
              'NAME': '2022',
              'VALUE': '2022'
            },
            {
              'NAME': '2021',
              'VALUE': '2021'
            },
            {
              'NAME': '2020',
              'VALUE': '2020'
            },
            {
              'NAME': '2019',
              'VALUE': '2019'
            },
            {
              'NAME': '2018',
              'VALUE': '2018'
            },
            {
              'NAME': '2017',
              'VALUE': '2017'
            },
            {
              'NAME': '2016',
              'VALUE': '2016'
            },
            {
              'NAME': '2015',
              'VALUE': '2015'
            },
            {
              'NAME': '2014',
              'VALUE': '2014'
            },
            {
              'NAME': '2013',
              'VALUE': '2013'
            },
            {
              'NAME': '2012',
              'VALUE': '2012'
            },
            {
              'NAME': '2011',
              'VALUE': '2011'
            },
            {
              'NAME': '2010',
              'VALUE': '2010'
            },
            {
              'NAME': '2009',
              'VALUE': '2009'
            },
            {
              'NAME': '2008',
              'VALUE': '2008'
            },
            {
              'NAME': '2007',
              'VALUE': '2007'
            },
            {
              'NAME': '2006',
              'VALUE': '2006'
            },
            {
              'NAME': '2005',
              'VALUE': '2005'
            },
            {
              'NAME': '2004',
              'VALUE': '2004'
            },
            {
              'NAME': '2003',
              'VALUE': '2003'
            },
            {
              'NAME': '2002',
              'VALUE': '2002'
            },
            {
              'NAME': '2001',
              'VALUE': '2001'
            },
            {
              'NAME': '2000',
              'VALUE': '2000'
            },
            {
              'NAME': '1999',
              'VALUE': '1999'
            },
            {
              'NAME': '1998',
              'VALUE': '1998'
            },
            {
              'NAME': '1997',
              'VALUE': '1997'
            },
            {
              'NAME': '1996',
              'VALUE': '1996'
            },
            {
              'NAME': '1995',
              'VALUE': '1995'
            },
            {
              'NAME': '1994',
              'VALUE': '1994'
            },
            {
              'NAME': '1993',
              'VALUE': '1993'
            },
            {
              'NAME': '1992',
              'VALUE': '1992'
            },
            {
              'NAME': '1991',
              'VALUE': '1991'
            },
            {
              'NAME': '1990',
              'VALUE': '1990'
            },
            {
              'NAME': '1989',
              'VALUE': '1989'
            },
            {
              'NAME': '1988',
              'VALUE': '1988'
            },
            {
              'NAME': '1987',
              'VALUE': '1987'
            },
            {
              'NAME': '1986',
              'VALUE': '1986'
            },
            {
              'NAME': '1985',
              'VALUE': '1985'
            },
            {
              'NAME': '1984',
              'VALUE': '1984'
            },
            {
              'NAME': '1983',
              'VALUE': '1983'
            },
            {
              'NAME': '1982',
              'VALUE': '1982'
            },
            {
              'NAME': '1981',
              'VALUE': '1981'
            },
            {
              'NAME': '1980',
              'VALUE': '1980'
            },
            {
              'NAME': '1979',
              'VALUE': '1979'
            },
            {
              'NAME': '1978',
              'VALUE': '1978'
            },
            {
              'NAME': '1977',
              'VALUE': '1977'
            },
            {
              'NAME': '1976',
              'VALUE': '1976'
            },
            {
              'NAME': '1975',
              'VALUE': '1975'
            },
            {
              'NAME': '1974',
              'VALUE': '1974'
            },
            {
              'NAME': '1973',
              'VALUE': '1973'
            },
            {
              'NAME': '1972',
              'VALUE': '1972'
            },
            {
              'NAME': '1971',
              'VALUE': '1971'
            },
            {
              'NAME': '1970',
              'VALUE': '1970'
            },
            {
              'NAME': '1969',
              'VALUE': '1969'
            },
            {
              'NAME': '1968',
              'VALUE': '1968'
            },
            {
              'NAME': '1967',
              'VALUE': '1967'
            },
            {
              'NAME': '1966',
              'VALUE': '1966'
            },
            {
              'NAME': '1965',
              'VALUE': '1965'
            },
            {
              'NAME': '1964',
              'VALUE': '1964'
            },
            {
              'NAME': '1963',
              'VALUE': '1963'
            },
            {
              'NAME': '1962',
              'VALUE': '1962'
            },
            {
              'NAME': '1961',
              'VALUE': '1961'
            },
            {
              'NAME': '1960',
              'VALUE': '1960'
            },
            {
              'NAME': '1959',
              'VALUE': '1959'
            },
            {
              'NAME': '1958',
              'VALUE': '1958'
            },
            {
              'NAME': '1957',
              'VALUE': '1957'
            },
            {
              'NAME': '1956',
              'VALUE': '1956'
            },
            {
              'NAME': '1955',
              'VALUE': '1955'
            },
            {
              'NAME': '1954',
              'VALUE': '1954'
            },
            {
              'NAME': '1953',
              'VALUE': '1953'
            },
            {
              'NAME': '1952',
              'VALUE': '1952'
            },
            {
              'NAME': '1951',
              'VALUE': '1951'
            },
            {
              'NAME': '1950',
              'VALUE': '1950'
            },
            {
              'NAME': '1949',
              'VALUE': '1949'
            },
            {
              'NAME': '1948',
              'VALUE': '1948'
            },
            {
              'NAME': '1947',
              'VALUE': '1947'
            },
            {
              'NAME': '1946',
              'VALUE': '1946'
            },
            {
              'NAME': '1945',
              'VALUE': '1945'
            },
            {
              'NAME': '1944',
              'VALUE': '1944'
            },
            {
              'NAME': '1943',
              'VALUE': '1943'
            },
            {
              'NAME': '1942',
              'VALUE': '1942'
            },
            {
              'NAME': '1941',
              'VALUE': '1941'
            },
            {
              'NAME': '1940',
              'VALUE': '1940'
            },
            {
              'NAME': '1939',
              'VALUE': '1939'
            },
            {
              'NAME': '1938',
              'VALUE': '1938'
            },
            {
              'NAME': '1937',
              'VALUE': '1937'
            },
            {
              'NAME': '1936',
              'VALUE': '1936'
            },
            {
              'NAME': '1935',
              'VALUE': '1935'
            },
            {
              'NAME': '1934',
              'VALUE': '1934'
            },
            {
              'NAME': '1933',
              'VALUE': '1933'
            },
            {
              'NAME': '1932',
              'VALUE': '1932'
            },
            {
              'NAME': '1931',
              'VALUE': '1931'
            },
            {
              'NAME': '1930',
              'VALUE': '1930'
            },
            {
              'NAME': '1929',
              'VALUE': '1929'
            },
            {
              'NAME': '1928',
              'VALUE': '1928'
            },
            {
              'NAME': '1927',
              'VALUE': '1927'
            },
            {
              'NAME': '1926',
              'VALUE': '1926'
            }
          ],
          'DAYS_PLACEHOLDER': 'Day',
          'MONTHS_PLACEHOLDER': 'Month',
          'YEARS_PLACEHOLDER': 'Year',
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        },
        {
          'ID': 'field_number',
          'TYPE': 'NUMBER',
          'NAME': 'number',
          'SUB_TYPE': {
            'NAME': 'Exact value',
            'PLACEHOLDER': '',
            'VALUE': 'exact'
          },
          'VALUES': {
            '_from': '',
            '_to': ''
          },
          'LABEL': 'number',
          'PLACEHOLDER': '',
          'SELECT_PARAMS': {
            'isMulti': false
          },
          'SUB_TYPES': [
            {
              'NAME': 'Exact value',
              'PLACEHOLDER': '',
              'VALUE': 'exact'
            },
            {
              'NAME': 'Range',
              'PLACEHOLDER': '',
              'VALUE': 'range'
            },
            {
              'NAME': 'More than',
              'PLACEHOLDER': '',
              'VALUE': 'more'
            },
            {
              'NAME': 'Less than',
              'PLACEHOLDER': '',
              'VALUE': 'less'
            }
          ],
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        },
        {
          'ID': 'field_checkbox',
          'TYPE': 'SELECT',
          'NAME': 'checkbox',
          'VALUE': {
            'NAME': 'Not specified',
            'VALUE': ''
          },
          'PLACEHOLDER': '',
          'LABEL': 'checkbox',
          'ITEMS': [
            {
              'NAME': 'Not specified',
              'VALUE': ''
            },
            {
              'NAME': 'Yes',
              'VALUE': 'Y'
            },
            {
              'NAME': 'No',
              'VALUE': 'N'
            }
          ],
          'PARAMS': {
            'isMulti': false
          },
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        },
        {
          'ID': 'field_custom_entity',
          'TYPE': 'CUSTOM_ENTITY',
          'NAME': 'custom_entity',
          'LABEL': 'custom_entity',
          'VALUES': {
            '_label': '',
            '_value': ''
          },
          'MULTIPLE': false,
          'PLACEHOLDER': '',
          'STRICT': false,
          'REQUIRED': false,
          'VALUE_REQUIRED': false
        }
      ],
      'INITIAL_FILTER': [
      ],
      'CONFIRM_MESSAGE': 'This will restore the preset filters but will leave your own filters unchanged.',
      'CONFIRM_APPLY': 'Continue',
      'CONFIRM_CANCEL': 'Cancel'
    }, {
      'SEARCH': true,
      'DEFAULT_PRESET': true,
      'FILTER_SHOW_DELAY': '0',
      'FILTER_SHOW_ANIM_EVENT': false,
      'FILTER_HIDE_DELAY': '0',
      'FILTER_HIDE_ANIM_EVENT': false,
      'AUTOFOCUS': true,
      'POPUP_BIND_ELEMENT_SELECTOR': false,
      'POPUP_OFFSET_LEFT': '0',
      'POPUP_OFFSET_TOP': '4'
    }, {
      'STRING': 'STRING',
      'TEXTAREA': 'TEXTAREA',
      'NUMBER': 'NUMBER',
      'DATE': 'DATE',
      'SELECT': 'SELECT',
      'MULTI_SELECT': 'MULTI_SELECT',
      'DEST_SELECTOR': 'DEST_SELECTOR',
      'ENTITY': 'ENTITY',
      'CUSTOM': 'CUSTOM',
      'CUSTOM_ENTITY': 'CUSTOM_ENTITY',
      'CUSTOM_DATE': 'CUSTOM_DATE'
    }, {
      'NONE': 'NONE',
      'YESTERDAY': 'YESTERDAY',
      'CURRENT_DAY': 'CURRENT_DAY',
      'TOMORROW': 'TOMORROW',
      'CURRENT_WEEK': 'CURRENT_WEEK',
      'CURRENT_MONTH': 'CURRENT_MONTH',
      'CURRENT_QUARTER': 'CURRENT_QUARTER',
      'LAST_7_DAYS': 'LAST_7_DAYS',
      'LAST_30_DAYS': 'LAST_30_DAYS',
      'LAST_60_DAYS': 'LAST_60_DAYS',
      'LAST_90_DAYS': 'LAST_90_DAYS',
      'PREV_DAYS': 'PREV_DAYS',
      'NEXT_DAYS': 'NEXT_DAYS',
      'MONTH': 'MONTH',
      'QUARTER': 'QUARTER',
      'YEAR': 'YEAR',
      'EXACT': 'EXACT',
      'LAST_WEEK': 'LAST_WEEK',
      'LAST_MONTH': 'LAST_MONTH',
      'RANGE': 'RANGE',
      'NEXT_WEEK': 'NEXT_WEEK',
      'NEXT_MONTH': 'NEXT_MONTH'
    }, {
      'SINGLE': 'exact',
      'RANGE': 'range',
      'MORE': 'more',
      'LESS': 'less'
    }, {
      'CUSTOM_DATE': 'CUSTOM_DATE',
      'PREV_DAY': 'PREV_DAY',
      'NEXT_DAY': 'NEXT_DAY',
      'MORE_THAN_DAYS_AGO': 'MORE_THAN_DAYS_AGO',
      'AFTER_DAYS': 'AFTER_DAYS'
    })
    );
  });
  