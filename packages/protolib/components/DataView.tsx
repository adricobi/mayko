import { YStack, XStack, Paragraph, Text, Button, Stack, ScrollView, Dialog } from 'tamagui'
import { useRemoteStateList, ObjectGrid, DataTableCard, PendingAtomResult, AlertDialog, DataTable2, API, Search, Tinted, EditableObject, usePendingEffect, AsyncView, Notice, ActiveGroup, ActiveGroupButton, ButtonGroup } from 'protolib'
import { createContext, useEffect, useState } from 'react'
import { Plus, LayoutGrid, List, Layers, X } from '@tamagui/lucide-icons'
import { z } from "zod";
import { getErrorMessage, useToastController } from '@my/ui'
import { useUpdateEffect } from 'usehooks-ts';
import { usePageParams, useQueryState } from 'protolib/next'
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { getPendingResult } from '../lib/createApiAtom'
import { DataTableList } from './DataTableList'
import ActiveRender from "./ActiveRender"
import { useThemeSetting } from '@tamagui/next-theme'
import { EditableObjectProps } from './EditableObject';

import { FileWidget } from '../adminpanel/features/components/FilesWidget';
import { IconContainer } from './IconContainer';

type DataViewState = {
    items: PendingAtomResult,
    model: any,
    selected: any[],
    setSelected: Function,
    onSelectItem: Function | undefined
    state: any,
    push: Function,
    mergePush: Function,
    removePush: Function,
    replace: Function,
    tableColumns: any[],
    rowIcon: any,
    sourceUrl: string
}
export const DataViewContext = createContext<DataViewState>({
    items: getPendingResult('pending'),
    model: null,
    selected: [],
    setSelected: (selected) => null,
    onSelectItem: undefined,
    state: {},
    push: () => null,
    mergePush: () => null,
    removePush: () => null,
    replace: () => null,
    tableColumns: [],
    rowIcon: null,
    sourceUrl: ""
});

export function DataView({
    onSelectItem,
    itemData,
    rowIcon,
    disableViewSelector = false,
    initialItems,
    sourceUrl,
    numColumnsForm = 1,
    name,
    pluralName,
    entityName,
    hideAdd = false,
    pageState,
    icons = {},
    model,
    extraFields = {},
    columns,
    onEdit = (data) => data,
    onAdd = (data) => data,
    views = undefined,
    extraViews = [],
    openMode = 'edit',
    disableToggleMode,
    customFields = {},
    dataTableRawProps = {},
    dataTableListProps = {},
    dataTableGridProps = {},
    extraFieldsForms = {},
    extraFieldsFormsEdit = {},
    extraFieldsFormsAdd = {},
    customFieldsForms = {},
    defaultView = 'list',
    disableViews = [],
    toolBarContent = null,
    onAddButton = undefined,
    extraMenuActions = [],
    objectProps = {}
}: { objectProps?: EditableObjectProps, openMode: 'edit' | 'view' } & any) {
    const [items, setItems] = useRemoteStateList(initialItems, { url: sourceUrl, ...pageState }, 'notifications/' + ((entityName ?? pluralName) ?? name + 's') + "/#", model)
    // const [items, setItems] = useState<PendingAtomResult | undefined>(initialItems);
    const [currentItems, setCurrentItems] = useState<PendingAtomResult | undefined>(initialItems)
    const [createOpen, setCreateOpen] = useState(false)
    const [state, setState] = useState(pageState)
    const { push, mergePush, removePush, replace } = usePageParams(state)
    const [selected, setSelected] = useState([])
    const [currentItemData, setCurrentItemData] = useState(itemData)

    useQueryState(setState)

    const fetch = async () => {
        const data = await API.get({ url: sourceUrl, ...state })
        setItems(data)
    }

    // usePendingEffect((s) => { API.get({ url: sourceUrl, ...pageState }, s) }, setItems, initialItems)

    useEffect(() => {
        if (items && items.isLoaded) {
            setCurrentItems(items)
        }
    }, [items])


    useUpdateEffect(() => { fetch() }, [state.orderBy+'_'+state.itemsPerPage+'_'+state.page+'_'+state.search+'_'+state.orderDirection])

    const onSearch = async (text) => push("search", text, false)
    const onCancelSearch = async () => setCurrentItems(items)
    const toast = useToastController()

    const defaultViews = [
        {
            name: 'list',
            icon: List,
            component: DataTableList,
            props: {
                sourceUrl,
                onDelete: () => { },
                extraMenuActions: extraMenuActions,
                ...dataTableListProps
            }
        },
        {
            name: 'grid',
            icon: LayoutGrid,
            component: ObjectGrid,
            props: {
                model,
                items: items?.data?.items,
                sourceUrl,
                customFields,
                extraFields,
                icons,
                ml: "$5",
                onDelete: () => { },
                onSelectItem: onSelectItem ? onSelectItem : (item) => replace('item', item.getId()),
                extraMenuActions: extraMenuActions,
                ...dataTableGridProps
            }
        },
        {
            name: 'raw',
            icon: Layers,
            component: DataTableCard,
            props: { ...dataTableRawProps }
        }
    ]
    const tableViews = (views ?? [...defaultViews, ...extraViews]).filter(v => !disableViews.includes(v.name))

    const activeViewIndex = tableViews.findIndex(v => v.name == state.view) != -1 ? tableViews.findIndex(v => v.name == state.view) : tableViews.findIndex(v => v.name == defaultView)
    const { resolvedTheme } = useThemeSetting()

    console.log('editFile: ', state.editFile)

    const getFilenameFromPath = (path) => {
        const parts = path.split('/');
        return parts.pop();
    }
    return (<YStack height="100%" f={1}>
        <DataViewContext.Provider value={{ items: currentItems, sourceUrl, model, selected, setSelected, onSelectItem, state, push, mergePush, removePush, replace, tableColumns: columns, rowIcon }}>
            <ActiveGroup initialState={activeViewIndex == -1 ? 0 : activeViewIndex}>
                <AlertDialog
                    p={"$0"}
                    hideAccept
                    setOpen={(s) => {
                        removePush('editFile')
                    }}
                    open={state.editFile}
                >
                    <XStack pt="$4" height={'90vh'} width={"90vw"}>
                        <FileWidget
                            isFull={false}
                            hideCloseIcon={false}
                            isModified={false}
                            setIsModified={() => {}}
                            icons={[
                                <IconContainer onPress={() => {
                                    removePush('editFile')
                                }}>
                                    <X color="var(--color)" size={"$1"} />
                                </IconContainer>
                            ]}
                            currentFileName={getFilenameFromPath(state.editFile??'')}
                            currentFile={state.editFile}
                        />
                    </XStack>

                </AlertDialog>

                <AlertDialog
                    p={"$2"}
                    pt="$5"
                    pl="$5"
                    setOpen={setCreateOpen}
                    open={createOpen}
                    hideAccept={true}
                    description={""}
                >
                    <YStack f={1} jc="center" ai="center">
                        <ScrollView maxHeight={"90vh"}>
                            <XStack mr="$5">
                                <EditableObject
                                    name={name}
                                    numColumns={numColumnsForm}
                                    mode={'add'}
                                    onSave={async (originalData, data) => {
                                        try {
                                            const obj = model.load(data)
                                            const result = await API.post(sourceUrl, onAdd(obj.create().getData()))
                                            if (result.isError) {
                                                throw result.error
                                            }
                                            // fetch()
                                            setCreateOpen(false);
                                            toast.show(name + ' created', {
                                                message: obj.getId()
                                            })
                                        } catch (e) {
                                            console.log('original error: ', e, e.flatten())
                                            throw getPendingResult('error', null, e instanceof z.ZodError ? e.flatten() : e)
                                        }
                                    }}
                                    model={model}
                                    extraFields={{ ...extraFields, ...extraFieldsForms, ...extraFieldsFormsAdd }}
                                    icons={icons}
                                    customFields={{ ...customFields, ...customFieldsForms }}
                                    {...objectProps}
                                />
                            </XStack>
                        </ScrollView>
                    </YStack>
                </AlertDialog>
                <AlertDialog
                    p={"$1"}
                    pt="$5"
                    pl="$5"
                    hideAccept={true}
                    acceptCaption="Save"
                    setOpen={(s) => {
                        setCurrentItemData(undefined);
                        removePush('item')
                    }}
                    open={state.item}
                    description={""}
                //bc={resolvedTheme == 'dark' ? "$background": "$color1"}
                >
                    <YStack f={1} jc="center" ai="center">
                        <ScrollView maxHeight={"90vh"}>
                            <Stack mr="$5">
                                <EditableObject
                                    disableToggleMode={disableToggleMode}
                                    initialData={currentItemData}
                                    name={name}
                                    spinnerSize={75}
                                    loadingText={<YStack ai="center" jc="center">Loading data for {name}<Paragraph fontWeight={"bold"}>{state.item}</Paragraph></YStack>}
                                    objectId={state.item}
                                    sourceUrl={sourceUrl + '/' + state.item}
                                    numColumns={numColumnsForm}
                                    mode={openMode}
                                    onSave={async (original, data) => {
                                        try {
                                            setCurrentItemData(undefined)
                                            const id = model.load(data).getId()
                                            const result = await API.post(sourceUrl + '/' + id, onEdit(model.load(original).update(model.load(data)).getData()))
                                            if (result.isError) {
                                                throw result.error
                                            }
                                            //fetch()
                                            const { item, ...rest } = state;
                                            setState(rest)
                                            toast.show(name + ' updated', {
                                                message: "Saved new settings for: " + id
                                            })
                                        } catch (e) {
                                            throw getPendingResult('error', null, e instanceof z.ZodError ? e.flatten() : e)
                                        }
                                    }}
                                    model={model}
                                    extraFields={{ ...extraFields, ...extraFieldsForms, ...extraFieldsFormsEdit }}
                                    icons={icons}
                                    customFields={{ ...customFields, ...customFieldsForms }}
                                    {...objectProps}
                                />
                            </Stack>
                        </ScrollView>
                    </YStack>
                </AlertDialog>

                <XStack pt="$3" px="$7" mb="$5">
                    <XStack left={-12} top={9} f={1} ai="center">
                        <Paragraph>
                            <Text fontSize="$5" color="$color11">{pluralName ? pluralName.charAt(0).toUpperCase() + pluralName.slice(1) : name.charAt(0).toUpperCase() + name.slice(1) + 's'} [<Tinted><Text fontSize={"$5"} o={1} color="$color10">{currentItems?.data?.total}</Text></Tinted>]</Text>
                        </Paragraph>
                        {toolBarContent}
                    </XStack>

                    <XStack position={"absolute"} right={20}>
                        <Search top={1} initialState={state?.search} onCancel={onCancelSearch} onSearch={onSearch} />
                        <XStack marginLeft="$3" top={-3}>
                            {!disableViewSelector && <ButtonGroup marginRight="$3">
                                {
                                    tableViews.map((v, index) => <ActiveGroupButton key={index} onSetActive={() => push('view', v.name)} activeId={index}>
                                        {React.createElement(v.icon, { size: "$1", strokeWidth: 1 })}
                                    </ActiveGroupButton>)
                                }
                            </ButtonGroup>}
                            <Tinted>
                                <Button hoverStyle={{ o: 1 }} o={0.7} circular onPress={() => {
                                    onAddButton ? onAddButton() : setCreateOpen(true)
                                }} chromeless={true}>
                                    {!hideAdd && <Plus />}
                                </Button>
                            </Tinted>
                        </XStack>

                    </XStack>
                </XStack>

                {items && items.isError && (
                    <Notice>
                        <Paragraph>{getErrorMessage(items.error)}</Paragraph>
                    </Notice>
                )}
                <Stack f={1}>
                    <AsyncView atom={currentItems}>
                        {
                            tableViews.map((v, index) => <ActiveRender height="100%" key={index} activeId={index}>
                                {React.createElement(v.component, { ...v.props } ?? {})}
                            </ActiveRender>
                            )}
                    </AsyncView>
                </Stack>
            </ActiveGroup>
        </DataViewContext.Provider>
    </YStack>
    )
}