# Khabiya Design System - Component Library Reference

**Version**: 1.0  
**Last Updated**: January 27, 2026  
**Design System**: Khabiya (Mauritania Digital Agency)  
**Figma File**: Bibliothèque de composants

---

## Overview

This document provides a comprehensive reference for all components available in the Khabiya design system. When building user interfaces, always use these components to ensure consistency, accessibility, and adherence to the design system.

**Important**: Each component has a Figma link that shows all variants, states, and properties. Reference these links to understand the exact visual specifications and behavior.

---

## Component Categories

### Navigation & Structure
- [En-tête (Header)](#en-tête-header)
- [Pied de page (Footer)](#pied-de-page-footer)
- [Menu](#menu)
- [Onglets (Tabs)](#onglets-tabs)

### Content Display
- [Carte (Card)](#carte-card)
- [Accordéon (Accordion)](#accordéon-accordion)

### User Input
- [Bouton (Button)](#bouton-button)
- [Champs de saisie (Input Field)](#champs-de-saisie-input-field)

### Feedback & Notifications
- [Alerte (Alert)](#alerte-alert)
- [Fenêtre modale (Modal)](#fenêtre-modale-modal)
- [Infobulle (Tooltip)](#infobulle-tooltip)

### Data & Status
- [Avatar](#avatar)
- [Tag](#tag)
- [Indicateur d'étapes (Step Indicator)](#indicateur-détapes-step-indicator)

---

## Component Specifications

### Accordéon (Accordion)

**Purpose**: Expandable/collapsible content sections for organizing information hierarchically.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=43-747&m=dev

**Use Cases**:
- FAQ sections
- Grouped settings or options
- Progressive disclosure of detailed information
- Multi-section forms

**Key Properties**:
- Title/header text
- Expandable/collapsible state
- Content area
- Icon indicator (chevron/plus/minus)
- Single or multiple items can be open simultaneously

**Accessibility Notes**:
- Must be keyboard navigable
- Screen reader support for expanded/collapsed states
- ARIA attributes required

**Usage Example**:
```jsx
<Accordion>
  <AccordionItem title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem title="Section 2">
    Content for section 2
  </AccordionItem>
</Accordion>
```

---

### Alerte (Alert)

**Purpose**: Display important messages, warnings, or notifications to users.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=242-2283&m=dev

**Use Cases**:
- System notifications
- Success/error feedback
- Warning messages
- Informational announcements

**Key Properties**:
- Type/severity (info, success, warning, error)
- Title (optional)
- Message text
- Icon
- Dismissible (optional close button)
- Action buttons (optional)

**Variants**:
- Info (blue)
- Success (green)
- Warning (yellow/orange)
- Error (red)

**Accessibility Notes**:
- Use appropriate ARIA roles (alert, status)
- Color should not be the only indicator
- Include icons for additional visual cues

**Usage Example**:
```jsx
<Alert type="success" dismissible>
  Votre dossier a été enregistré avec succès.
</Alert>

<Alert type="error" title="Erreur">
  Une erreur s'est produite lors de l'enregistrement.
</Alert>
```

---

### Avatar

**Purpose**: Display user profile images or initials.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=43-873&m=dev

**Use Cases**:
- User profile displays
- Comment sections
- User lists
- Navigation headers

**Key Properties**:
- Size variants (small, medium, large, extra-large)
- Image source
- Fallback (initials or default icon)
- Shape (circle or rounded square)
- Status indicator (optional - online/offline/busy)
- Border/outline (optional)

**Accessibility Notes**:
- Include alt text for images
- Ensure sufficient contrast for initials

**Usage Example**:
```jsx
<Avatar 
  src="/path/to/image.jpg" 
  alt="Nom de l'utilisateur"
  size="medium"
/>

<Avatar 
  initials="AB"
  size="large"
  status="online"
/>
```

---

### Bouton (Button)

**Purpose**: Trigger actions and operations throughout the interface.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=205-3983&m=dev

**Use Cases**:
- Form submissions
- Navigation actions
- Modal confirmations
- CRUD operations

**Key Properties**:
- Label text
- Variant (primary, secondary, tertiary, ghost, danger)
- Size (small, medium, large)
- State (default, hover, active, disabled, loading)
- Icon (optional, leading or trailing)
- Full width (optional)

**Variants**:
- **Primary**: Main call-to-action, filled background
- **Secondary**: Less prominent actions, outlined or lighter fill
- **Tertiary**: Subtle actions, minimal styling
- **Ghost**: Text-only appearance
- **Danger**: Destructive actions (red)

**Accessibility Notes**:
- Clear, descriptive labels
- Adequate touch target size (min 44x44px)
- Focus indicators
- Loading states with ARIA live regions

**Usage Example**:
```jsx
<Button variant="primary" size="medium">
  Enregistrer
</Button>

<Button variant="secondary" icon="plus" iconPosition="leading">
  Ajouter un patient
</Button>

<Button variant="danger" disabled>
  Supprimer
</Button>
```

---

### Carte (Card)

**Purpose**: Container for related information and actions, creating visual hierarchy.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=131-9439&m=dev

**Use Cases**:
- Patient records summary
- Dashboard widgets
- Content previews
- List items with rich content

**Key Properties**:
- Header (title, subtitle, actions)
- Body content area
- Footer (optional, for actions or metadata)
- Image/media area (optional)
- Elevation/shadow
- Padding
- Border/outline
- Clickable/hoverable (optional)

**Variants**:
- Basic card
- Interactive card (clickable)
- Card with image
- Horizontal card
- Elevated card

**Accessibility Notes**:
- If clickable, entire card should be keyboard accessible
- Clear heading hierarchy within card
- Adequate contrast for text on background

**Usage Example**:
```jsx
<Card>
  <CardHeader 
    title="Dossier Patient"
    subtitle="Dr. Mamadou Diallo"
    action={<Button variant="ghost" icon="more" />}
  />
  <CardBody>
    Dernière consultation: 15 janvier 2026
  </CardBody>
  <CardFooter>
    <Button variant="primary">Voir le dossier</Button>
  </CardFooter>
</Card>
```

---

### Champs de saisie (Input Field)

**Purpose**: Allow users to enter text, numbers, dates, and other data.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?m=dev

**Use Cases**:
- Forms
- Search bars
- Data entry
- User settings

**Key Properties**:
- Label
- Placeholder text
- Input type (text, email, password, number, tel, date, etc.)
- State (default, focus, error, disabled, readonly)
- Helper text
- Error message
- Required indicator
- Icon (optional, leading or trailing)
- Prefix/suffix (optional)

**Types**:
- Text input
- Textarea (multiline)
- Select/dropdown
- Checkbox
- Radio button
- Date picker
- Search field

**Accessibility Notes**:
- Associate labels with inputs
- Clear error messages
- Required field indicators
- Keyboard navigation
- Screen reader friendly

**Usage Example**:
```jsx
<InputField 
  label="Nom du patient"
  placeholder="Entrez le nom"
  required
  helperText="Nom complet tel qu'il apparaît sur la carte d'identité"
/>

<InputField 
  label="Email"
  type="email"
  error="Adresse email invalide"
  value={email}
  onChange={handleChange}
/>

<Textarea 
  label="Notes médicales"
  rows={4}
  placeholder="Entrez vos observations..."
/>
```

---

### En-tête (Header)

**Purpose**: Primary navigation and branding container at the top of the application.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=149-989&m=dev

**Use Cases**:
- Application navigation
- Branding display
- User account access
- Global search
- Quick actions

**Key Properties**:
- Logo/branding area
- Navigation links
- Search bar (optional)
- User menu/profile
- Notifications (optional)
- Mobile menu toggle
- Sticky/fixed positioning

**Variants**:
- Desktop layout
- Mobile/responsive layout
- With search
- With notifications

**Accessibility Notes**:
- Landmark navigation role
- Skip to main content link
- Keyboard navigation
- Mobile menu accessibility

**Usage Example**:
```jsx
<Header>
  <HeaderLogo src="/logo.svg" alt="Khabiya" />
  <HeaderNav>
    <NavLink href="/dashboard">Tableau de bord</NavLink>
    <NavLink href="/patients">Patients</NavLink>
    <NavLink href="/rendez-vous">Rendez-vous</NavLink>
  </HeaderNav>
  <HeaderActions>
    <SearchBar />
    <NotificationButton />
    <UserMenu />
  </HeaderActions>
</Header>
```

---

### Fenêtre modale (Modal)

**Purpose**: Display content in a layer above the main interface, requiring user interaction.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=67-2006&m=dev

**Use Cases**:
- Confirmations
- Forms in overlay
- Detailed views
- Alerts requiring action
- Multi-step processes

**Key Properties**:
- Title
- Content area
- Action buttons (footer)
- Close button
- Size (small, medium, large, full-screen)
- Backdrop/overlay
- Dismissible on backdrop click (optional)

**Variants**:
- Confirmation dialog
- Form modal
- Content modal
- Full-screen modal

**Accessibility Notes**:
- Focus trap within modal
- ESC key to close
- Focus return to trigger element
- ARIA dialog role
- Screen reader announcements

**Usage Example**:
```jsx
<Modal 
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirmer la suppression"
  size="small"
>
  <ModalBody>
    Êtes-vous sûr de vouloir supprimer ce dossier patient ?
    Cette action est irréversible.
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>
      Annuler
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      Supprimer
    </Button>
  </ModalFooter>
</Modal>
```

---

### Infobulle (Tooltip)

**Purpose**: Provide contextual information on hover or focus.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=192-8852&m=dev

**Use Cases**:
- Icon explanations
- Additional context
- Keyboard shortcuts
- Help text
- Truncated text expansion

**Key Properties**:
- Content text
- Position (top, bottom, left, right)
- Trigger (hover, focus, click)
- Delay
- Arrow/pointer
- Max width

**Accessibility Notes**:
- Available on keyboard focus
- Screen reader accessible
- Use sparingly, prefer visible text
- Don't hide critical information in tooltips

**Usage Example**:
```jsx
<Tooltip content="Enregistrer les modifications" position="top">
  <Button variant="ghost" icon="save" />
</Tooltip>

<Tooltip content="Numéro de téléphone du patient">
  <InputField label="Téléphone" />
</Tooltip>
```

---

### Menu

**Purpose**: Display a list of actions or navigation options in a dropdown or sidebar.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=131-11670&m=dev

**Use Cases**:
- Dropdown menus
- Context menus
- User account menus
- Navigation sidebars
- Action lists

**Key Properties**:
- Menu items (label, icon, action)
- Dividers/separators
- Submenus (nested)
- Disabled items
- Selected/active state
- Icons (optional)

**Variants**:
- Dropdown menu
- Context menu
- Sidebar navigation
- Action menu

**Accessibility Notes**:
- Keyboard navigation (arrow keys)
- Focus management
- ARIA menu roles
- ESC to close

**Usage Example**:
```jsx
<Menu trigger={<Button>Actions</Button>}>
  <MenuItem icon="edit">Modifier</MenuItem>
  <MenuItem icon="copy">Dupliquer</MenuItem>
  <MenuDivider />
  <MenuItem icon="trash" variant="danger">Supprimer</MenuItem>
</Menu>

<SidebarMenu>
  <MenuItem icon="dashboard" active>Tableau de bord</MenuItem>
  <MenuItem icon="users">Patients</MenuItem>
  <MenuItem icon="calendar">Rendez-vous</MenuItem>
</SidebarMenu>
```

---

### Onglets (Tabs)

**Purpose**: Organize content into separate views that users can switch between.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=78-3600&m=dev

**Use Cases**:
- Multi-section forms
- Different data views
- Settings panels
- Profile sections
- Dashboard views

**Key Properties**:
- Tab labels
- Active/selected state
- Tab content panels
- Icon support (optional)
- Badge/counter (optional)
- Orientation (horizontal/vertical)

**Variants**:
- Line tabs (underline indicator)
- Pill tabs (filled background)
- Button tabs
- Vertical tabs

**Accessibility Notes**:
- Arrow key navigation
- Tab keyboard interaction pattern
- ARIA tablist/tab/tabpanel roles
- Focus indicators

**Usage Example**:
```jsx
<Tabs defaultTab="info">
  <TabList>
    <Tab value="info">Informations générales</Tab>
    <Tab value="medical">Historique médical</Tab>
    <Tab value="appointments">Rendez-vous</Tab>
  </TabList>
  
  <TabPanel value="info">
    {/* Patient information content */}
  </TabPanel>
  
  <TabPanel value="medical">
    {/* Medical history content */}
  </TabPanel>
  
  <TabPanel value="appointments">
    {/* Appointments content */}
  </TabPanel>
</Tabs>
```

---

### Pied de page (Footer)

**Purpose**: Bottom section containing secondary navigation, legal info, and contact details.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=131-13329&m=dev

**Use Cases**:
- Copyright information
- Legal links
- Contact information
- Social media links
- Secondary navigation
- Newsletter signup

**Key Properties**:
- Multiple columns/sections
- Links
- Logo (optional)
- Social media icons
- Copyright text
- Language selector (optional)

**Variants**:
- Simple footer (single row)
- Multi-column footer
- Footer with newsletter
- Minimal footer

**Accessibility Notes**:
- Landmark contentinfo role
- Keyboard accessible links
- Clear link purposes

**Usage Example**:
```jsx
<Footer>
  <FooterSection title="À propos">
    <FooterLink href="/about">Notre mission</FooterLink>
    <FooterLink href="/team">Équipe</FooterLink>
    <FooterLink href="/contact">Contact</FooterLink>
  </FooterSection>
  
  <FooterSection title="Légal">
    <FooterLink href="/privacy">Confidentialité</FooterLink>
    <FooterLink href="/terms">Conditions d'utilisation</FooterLink>
  </FooterSection>
  
  <FooterBottom>
    <Copyright>© 2026 Khabiya. Tous droits réservés.</Copyright>
  </FooterBottom>
</Footer>
```

---

### Indicateur d'étapes (Step Indicator)

**Purpose**: Show progress through a multi-step process or workflow.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=242-5810&m=dev

**Use Cases**:
- Multi-step forms
- Onboarding flows
- Checkout processes
- Application workflows
- Setup wizards

**Key Properties**:
- Steps (labels, numbers)
- Current step indicator
- Completed steps
- Upcoming steps
- Orientation (horizontal/vertical)
- Connector lines
- Clickable steps (optional)

**Variants**:
- Numbered steps
- Icon steps
- Progress bar style
- Vertical stepper

**Accessibility Notes**:
- Clear current step indication
- Screen reader friendly
- Keyboard navigation if clickable
- ARIA current attribute

**Usage Example**:
```jsx
<StepIndicator currentStep={2} totalSteps={4}>
  <Step completed>Informations personnelles</Step>
  <Step active>Informations médicales</Step>
  <Step>Documents</Step>
  <Step>Confirmation</Step>
</StepIndicator>

<StepIndicator variant="progress" currentStep={2} totalSteps={4} />
```

---

### Tag

**Purpose**: Label and categorize content with small, compact visual indicators.

**Figma Reference**: https://www.figma.com/design/sOG8bxZmRyMwwfxmjCcQWg/Biblioth%C3%A8que-de-composants?node-id=132-3046&m=dev

**Use Cases**:
- Status indicators
- Categories
- Keywords/labels
- Filters
- User attributes
- Priority levels

**Key Properties**:
- Label text
- Color/variant (info, success, warning, error, neutral)
- Size (small, medium, large)
- Icon (optional)
- Removable (with close button)
- Clickable (optional)

**Variants**:
- Filled
- Outlined
- Subtle/ghost
- With icon
- Removable tag

**Accessibility Notes**:
- Color should not be sole indicator
- If interactive, proper focus states
- Screen reader friendly labels

**Usage Example**:
```jsx
<Tag variant="success">Actif</Tag>
<Tag variant="warning">En attente</Tag>
<Tag variant="error">Urgent</Tag>

<Tag variant="neutral" removable onRemove={handleRemove}>
  Cardiologie
</Tag>

<Tag icon="user" variant="info">
  Nouveau patient
</Tag>
```

---

## Design Tokens & Styling

When using these components, reference the design tokens exported from Figma for:

- **Colors**: Primary, secondary, neutral palettes, semantic colors
- **Spacing**: Consistent spacing scale (4, 8, 16, 24, 32, 48, 64px)
- **Typography**: Font families, sizes, weights, line heights
- **Shadows**: Elevation levels
- **Border radius**: Corner rounding values
- **Breakpoints**: Responsive design breakpoints

---

## Language & Localization

All components support:
- **French** (primary)
- **Arabic** (with RTL support)
- **English** (fallback)

Ensure all text content is localizable and follows proper text direction for RTL languages.

---

## Accessibility Standards

All Khabiya components must meet:
- **WCAG 2.1 AA** compliance
- Keyboard navigation
- Screen reader support
- Sufficient color contrast
- Focus indicators
- Appropriate ARIA attributes

---

## Component Composition Principles

When building interfaces with Khabiya components:

1. **Consistency**: Always use components as designed, don't create custom variants
2. **Hierarchy**: Establish clear visual hierarchy using size, color, and spacing
3. **Whitespace**: Use generous spacing for readability
4. **Responsiveness**: Ensure all layouts work on mobile, tablet, and desktop
5. **Accessibility First**: Test with keyboard and screen readers
6. **Performance**: Optimize for fast loading and smooth interactions

---

## Usage Guidelines for AI-Assisted Development

When Claude or Cursor uses this component library:

1. **Always reference the Figma links** to understand exact specifications
2. **Use semantic HTML** and proper component structure
3. **Include all accessibility attributes** (ARIA labels, roles, etc.)
4. **Follow naming conventions** from this document
5. **Implement proper state management** (hover, focus, active, disabled)
6. **Ensure responsive behavior** across all screen sizes
7. **Use design tokens** instead of hard-coded values
8. **Provide fallbacks** for images and icons
9. **Handle loading and error states** appropriately
10. **Test keyboard navigation** in generated code

---

## Example: Building a Patient Dashboard

Here's how to compose multiple Khabiya components for a common use case:

```jsx
<>
  <Header>
    <HeaderLogo src="/logo.svg" alt="Khabiya" />
    <HeaderNav>
      <NavLink href="/dashboard" active>Tableau de bord</NavLink>
      <NavLink href="/patients">Patients</NavLink>
    </HeaderNav>
    <HeaderActions>
      <UserMenu />
    </HeaderActions>
  </Header>

  <main>
    <StepIndicator currentStep={1} totalSteps={3}>
      <Step active>Vue d'ensemble</Step>
      <Step>Patients récents</Step>
      <Step>Rendez-vous</Step>
    </StepIndicator>

    <Alert type="info" dismissible>
      Vous avez 3 nouveaux patients cette semaine.
    </Alert>

    <div className="dashboard-grid">
      <Card>
        <CardHeader title="Patients actifs" />
        <CardBody>
          <div className="stat-value">248</div>
          <Tag variant="success" icon="trending-up">+12%</Tag>
        </CardBody>
      </Card>

      <Card>
        <CardHeader 
          title="Rendez-vous aujourd'hui" 
          action={<Button variant="ghost" icon="calendar" />}
        />
        <CardBody>
          {appointments.map(apt => (
            <div key={apt.id} className="appointment-item">
              <Avatar src={apt.patient.avatar} size="small" />
              <span>{apt.patient.name}</span>
              <Tag variant="info">{apt.time}</Tag>
            </div>
          ))}
        </CardBody>
        <CardFooter>
          <Button variant="primary">Voir tous les rendez-vous</Button>
        </CardFooter>
      </Card>
    </div>
  </main>

  <Footer>
    <FooterSection title="Support">
      <FooterLink href="/help">Aide</FooterLink>
      <FooterLink href="/contact">Contact</FooterLink>
    </FooterSection>
    <FooterBottom>
      <Copyright>© 2026 Khabiya</Copyright>
    </FooterBottom>
  </Footer>
</>
```

---

## Getting Help

- **Figma File**: Review component specifications and variants in Figma Dev Mode
- **Design Tokens**: Reference the exported JSON for exact values
- **Questions**: Consult the workshop facilitator or design system documentation

---

**Document Maintained By**: Design System Team  
**For**: MTNMA/ANETAT Digital Agency  
**Workshop**: AI-Assisted Service Design with Khabiya  
**Version**: 1.0 - January 2026
