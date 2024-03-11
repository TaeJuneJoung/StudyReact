export default function Section({ title, children, ...styles }) {
    return (
        <section {...styles}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}