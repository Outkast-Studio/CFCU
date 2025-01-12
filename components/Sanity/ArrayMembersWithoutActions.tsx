// ./components/input/ArrayMembersWithoutActions.tsx
import type { InputProps } from 'sanity'

/**
 * If context menu changes, e.g removes or adds new actions, this should be updated to reflect the changes and allow for removal of new action or remove option to remove non-exisiting action.
 */
type Actions =
  | 'Remove'
  | 'Copy'
  | 'Replace'
  | 'Duplicate'
  | 'Add item before'
  | 'Add item after'

type Context = {
  /* List of Array Member context menu's actions to remove */
  removeActions: Actions[]
}

/**
 * Important to note, if the sanity context menu changes, this order needs to be maintained, to reflect the options and order
 * The action is mapped to the order of listing in the Context menu from Top (1) To Bottom (N > 1)
 */
const ActionsMenuOrder: Record<Actions, number> = {
  Remove: 1,
  Replace: 2,
  Copy: 3,
  Duplicate: 4,
  'Add item before': 4,
  'Add item after': 5,
}

/**
 * Array Input wrapper component to remove ArrayMember Menu action(s).
 * @param props {@link InputProps}
 * @param context {@link Context}
 * @returns Array Input Component that removes specified actions from ArrayMembers context menu.
 * 
 * @example
 * ```ts
 * defineField({
  name: "a",
  title: "A",
  type: "array",
  components: {
    input: (props: InputProps) =>
      ArrayMembersWithoutAction(props, {
        actions: ["Duplicate"],
      }),
  },
  of: [...],
  ...,
});
 * ```
 */
export const ArrayMembersWithoutActions = (
  props: InputProps,
  context: Context,
) => {
  const arraySchemaName = props.elementProps.id

  const buttonRemovals = context.removeActions.map((action) => {
    return `
      div[data-ui="Menu"][aria-labelledby^="${arraySchemaName}"] div[data-ui="Stack"] button[data-ui="MenuItem"]:nth-child(${ActionsMenuOrder[action]}) {
        display: none;
      }
    `
  })

  return (
    <div>
      <style>{buttonRemovals.join('\n')}</style>
      {props.renderDefault(props)}
    </div>
  )
}
